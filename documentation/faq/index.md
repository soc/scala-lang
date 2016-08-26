---
layout: page
title: Common Questions
---

## General

### What is Scala?
See [What is Scala](http://scala-lang.org/what-is-scala.html) article by Martin Odersky

### What is Scala’s history?
Maybe http://www.artima.com/weblogs/viewpost.jsp?thread=163733 or https://www.artima.com/scalazine/articles/origins_of_scala.html ?

### What are the Scala people currently working on?
Java 8 support, focus on compatibility between 2.11 and 2.12, etc.

### What are Scala's plans for the future?
TASTY, dotty, DOT, mechanized soundness proof, SBT 1.0, union/intersection types, singleton types, optimizations, macros, ...

### Is Scala harder to use than X?
No => show list of things Scala doesn’t have or simplifies, but harder to learn, because ...
Something along the lines of:

> During the debate, I think there was a great question/comment about Scala being not too "separable" in terms of learning concepts of the language: https://youtu.be/xUWNcL7NRxg?t=29m40s

> I just want to add another thought to the question and the answers that followed:

> Our strive to have a dense feature interaction matrix kind of clashes with the desire to have a language with easily separable pieces, so the problems are inherent in our approach. In my opinion the lesson is not to abandon this philosophy, but to make sure that explanations and documentation goes the extra mile, which might not be necessary in less coherent languages.

> This could also explain a bit why people say "Scala is hard, ... but I can kind of deal with C#", despite C# being a great definition of a kitchen sink language: C# has so many features which can't be combined with each other that the individual bits and pieces feel more manageable, and question like "what happens when I combine A with B and leverage C in addition?" (answer: you can't, it's probably already falling apart at step B) never need to be considered.

> What do you think?

Martin: Yes, I think that's spot on. Orthogonality of features makes a language harder to learn.

## Language

### Why does Scala use "i: Int" syntax instead of "Int i"?

// Mention generics instead

It improves readability especially in combination with Scala's type inference. Example:
```scala
(1 to 10).map((x: Int) => x*x) // explicit type annotation
(1 to 10).map((x) => x*x) // uses type inference
(1 to 10).map((Int x) => x*x) // not valid Scala syntax
```
Line 1 is unnecessarily verbose as the compiler knows that parameter x must be of type Int. Line 2 shows the same code using type inference. Line 3 shows how it would look like in Java syntax, which is less readable in Scala.

This is not issue in Java, because it has no type inference, so it is clear that the first token is type and second token is identifier. If Scala used this syntax, it would not be so clear, because you can omit the type in some cases.

### Why does Scala use [] instead of <> for generic types?
Many languages that were created without generics in mind have trouble adding generics later on, as all pairs of brackets, `(` and `)`, `{` and `}`, `<` and `>`, have already been put to use.

Of that group, `<` and `>` are usually the only symbols left that are practical to overload with a new, different meaning (`<` and `>` are often employed as binary operators expressing comparisons or bitshift operations, not as brackets).
Unfortunately, even `<` and `>` have troubling parsing issues that require workarounds. While parsing should be solely considered a problem for compiler writers, it is often the case that things that are hard to parse for machines are often hard to read for humans, too.

The general issue is that it's hard to tell for the compiler, given a token stream of `instance . foo <`, whether this is the left side of a comparison and `<` is a binary operator or the start of a generic type argument within a method call.

Some languages try to avoid this issue by making the syntax less consistent: As an example, Java's syntax for _defining_ and _using_ generics in instance methods is completely different due to this issue:

```
<T> void foo<T>() { ... } // definition
instance.<String>foo()    // usage
```

Other languages like C# try to retain a more consistent syntax by introducing unlimited look-ahead: The parser will keep reading input after the `<` until it can make a decision.

Scala was designed with generics from the start and doesn't suffer these issues.

1. The usage of a generic type mirrors it's definition:

```
class Foo[T]
new Foo[String]
def foo[T] = ???
foo[String]
```

2. In Scala, the use of brackets is straight-forward and easy to understand:
  - Whenever you see `[]`, you know that everything in between is a type.
  - Whenever you see `()`, you know it is a parameter list, a single expression or a tuple.
  - Whenever you see `{}`, you know it is a block that can contain multiple statements and definitions.

### Why does Scala have special syntax for `new`? Why not express instance creation without the `new`?

On many platforms, including the JVM, the creation of a new instance has very specific semantics,
both on the language-level and on the level of the memory model, which both restrict and complicate the usage of `new`.

Scala tries to be explicit about these special semantics by requiring the use of the `new` keyword,
instead of e. g. allowing `ClassName()` to stand in for `new ClassName()`.

Additionally, if Scala considered `ClassName()` to be a constructor invocation, this syntax wouldn't work for interfaces.

Scala's design approach considers the following points:

- Explicit: Special operations should be explicit.
- Focused: The task of a constructor is to return a valid instance by initializing the fields of the instance with the arguments passed to the constructor invocation, not arbitrary work like parsing inputs or computing values.

Instead of allowing complicated initialization logic with multiple, overloaded constructors,
Scala encourages the use of explicitly named factory methods in companion objects:

- Named: As factory methods are just normal methods, they can be named appropriately. If a method involves parsing data from a `String`, the name can express it.
- General: Both classes and interfaces can have companion objects, and therefore factory methods.
- Flexible: Factory methods, unlike constructors, can decide which type they return and whether the create a new instance or return a cached value: If construction could fail, they can communicate this fact clearly with `Option[ClassName]` instead of throwing an exception. If a different class should be used depending on the inputs, factory methods can do that. If the method receives the same inputs multiple times, it can return an existing instance.
- Concise: As factory methods are the encouraged design approach in Scala, they can make use of the "best syntax": `ClassName(arg1, arg2, ...)`.


### Why does Scala provide implicit classes instead of extension methods?
Todo...

### What does _ (underscore) mean?

It can be used in many places in Scala and its meaning depends on the context it is used. It usually means *I need to refer to something, but I don't need it so I won't give it a name*. Examples:
```scala
import foo._
x match { case (“a”, _) => ... }
x.map(_ * 2)
x.map((_: Int) * 2)
```
Explanation:
* line 1: import everything from package foo (similar to import foo.* in Java)
* line 2: second parameter can be anything in the pattern match
* line 3: equivalent to `x.map(x => x * 2)` but more concise. It means “the value” and the expression `_ * 2` is a partial application.
* line 4: same as above, but with explicit (non-infered) type annotation

### Why can’t I define both a variable and a method with the same name?

Compared to other languages, Scala vastly reduces the number of different namespaces.

This reduces the mental overhead as a name can only refer to either a term (value) or a type in Scala
and makes it straight-forward to replace or implement a nullary method with a value,
to substitute a package with an package object and so on without breaking source-compatibility.

In contrast, Java has six different namespaces (packages, classes and interfaces, methods, fields, types and labels), making this a valid program:

```
package foo;
public class foo<foo> {
  public foo foo;
  public foo foo() {
    foo = foo(0);
    foo: while (true) {
      int foo = 42;
      while (true) {
        foo(foo).foo = (foo) null;
        break foo;
      }
    }
    return this;
  }
}
```

### No special syntax for null?
null is not the problem, it’s a symptom of the problem:
overuse of null because it so convenient
null can mean different things (absent value, missing value, error condition), context lost.
NPEs

### What are Scala's Null, Nothing, None?
Null is the type for null value. (Notice the different case between “null” and “Null”.) It is subtype of any reference type.

Nothing is a type which has no value. Don’t confuse this with the Unit (or void) type. When some expression is a type of Nothing, it will never return. It will either throw an exception or never end. For this reason, Nothing is subtype of any other type. This makes expressions like the following one valid:

`if(x == 0) sys.error(“x shall not be zero”) else 5/x`

## Development

### Which editors and IDEs support Scala?
* [IntelliJ IDEA](https://www.jetbrains.com/idea/) using their official [Scala plugin](https://plugins.jetbrains.com/plugin/?id=1347)
* [ScalaIDE](http://scala-ide.org/) for [Eclipse](https://eclipse.org/)
* Standard text editors like Emacs, Sublime, Vim, ...
* [ENSIME](https://github.com/ensime) wich supports a variety of editors like Emacs, Sublime, Vim, ...

### Can you debug Scala code?
Same way as you debug a Java app, SBT, IntelliJ. See also http://stackoverflow.com/questions/4150776/debugging-scala-code-with-simple-build-tool-sbt-and-intellij

Any caveats as Scala is functional? How do you debug functions / closures? See also http://stackoverflow.com/questions/4272797/debugging-functional-code-in-scala

### Why does Scala have its own build tool (SBT)?
SBT is standard / recommended way as it's Scala based, mention additional features compared to other build tools

### Which other build tools are supported?
Mention maven, plugins, ...

### Will my code work across Scala versions?
Todo...

### Which versioning scheme does Scala use?
Todo...

### What are Scala's compatibility guarantees?
Compare with Java's guarantees?

## JVM

### What do you need to know to run Scala applications in production?
ops teams, devops, compared to Java apps, “Just another jar file” etc.

### Garbage collection?
Todo...

## Web

### Can Scala run in the browser?
Yes. ...

JH: Remove the more specific Qs and link to a dedicated article?

### How large are Scala.js applications?

### How fast are Scala.js applications?

### Can I use JavaScript libraries from Scala.js?

Yes, there are multiple ways:
using js.Dynamic object
defining the object model in the Scala language
JS native code?

### Can I use Scala.js libraries from JavaScript?

### Do IDEs support Scala.js development?

### Does SBT support Scala.js development?

### There is a SBT plugin for Scala.js.

### How does Scala.js handle upcoming JavaScript versions?

## Mobile

### Can Scala be used to write Mobile apps?
Todo... mention Android

JH: Remove the more specific Qs and link to a dedicated article?

### How large are Android apps written in Scala?
smallest size is about 1mb (vs. 50kb for java) everything else scales linearly

### Do processing steps like tree-shaking (removing unused code) slow down development?

### How can scala be used to improve android development?

### How do I build android apps using scala?

(sbt plugins, gradle plugins, maven plugins… ide support…)

### What versions of Scala can I use with Android?
2.8-2.11
