---
layout: page
title: Common Questions
---

## General

### What is Scala?
See [What is Scala](http://scala-lang.org/what-is-scala.html) by Martin Odersky

### What is Scala’s history?
Maybe http://www.artima.com/weblogs/viewpost.jsp?thread=163733 or https://www.artima.com/scalazine/articles/origins_of_scala.html ?

### What are the Scala guys currently working on?
Java 8 support, focus on compatibility between 2.11 and 2.12, etc.

### What are Scala's plans for the future?
TASTY, dotty, DOT, mechanized soundness proof, SBT 1.0, union/intersection types, singleton types, optimizations, macros, ...

### Is Scala harder to use than X?
**JH: Possibly too big for the FAQ section, move to its own article?** <br/>
No => show list of things Scala doesn’t have or simplifies, but harder to learn, because ...
Something along the lines of:
During the debate, I think there was a great question/comment about Scala being not too "separable" in terms of learning concepts of the language: https://youtu.be/xUWNcL7NRxg?t=29m40s

I just want to add another thought to the question and the answers that followed:

Our strive to have a dense feature interaction matrix kind of clashes with the desire to have a language with easily separable pieces, so the problems are inherent in our approach. In my opinion the lesson is not to abandon this philosophy, but to make sure that explanations and documentation goes the extra mile, which might not be necessary in less coherent languages.

This could also explain a bit why people say "Scala is hard, ... but I can kind of deal with C#", despite C# being a great definition of a kitchen sink language: C# has so many features which can't be combined with each other that the individual bits and pieces feel more manageable, and question like "what happens when I combine A with B and leverage C in addition?" (answer: you can't, it's probably already falling apart at step B) never need to be considered.

What do you think?

**Martin:** Yes, I think that's spot on. Orthogonality of features makes a language harder to learn. 

## Development

### Which editors and IDEs support Scala?
* [IntelliJ IDEA](https://www.jetbrains.com/idea/) using their official [Scala plugin](https://plugins.jetbrains.com/plugin/?id=1347)
* [ScalaIDE](http://scala-ide.org/) for [Eclipse](https://eclipse.org/)
* Emacs, Vim, Sublime, ...
* [ENSIME](https://github.com/ensime) wich supports a variety of editors like Vim, Emacs, Sublime, ...

### Can you debug Scala code?
Same way as you debug a Java app, SBT, IntelliJ. See also http://stackoverflow.com/questions/4150776/debugging-scala-code-with-simple-build-tool-sbt-and-intellij

Any caveats as Scala is functional? How do you debug functions / closures? See also http://stackoverflow.com/questions/4272797/debugging-functional-code-in-scala

### Why does Scala have its own build tool, SBT?
**JH: Do we really need to ask Why?** <br/>
Shouldn't the Q be **How do you build Scala code?** and mention that SBT is standard / recommended way as it's Scala based...

### Which other build tools are supported?
Mention maven, plugins, ...

### Will my code work across Scala versions?
Todo...

### Which versioning scheme does Scala use?
Todo...

### What are Scala's compatibility guarantees?
**JH: Compare with Java's guarantees**

### Why does Scala use "i: Int" syntax?
(instead of the "Int i" syntax that Java uses)
It improves readability especially in combination with Scala's powerful type inference. Example:
```scala
(1 to 10).map((x: Int) => x*x) // explicit type annotation
(1 to 10).map((x) => x*x) // uses type inference
(1 to 10).map((Int x) => x*x) // not valid Scala syntax
```
The snippet 1 is unnecessarily verbose as the compiler knows that parameter x must be of type Int. Snippet 2 shows the same code using type inference. Snippet 3 shows how it would look like with Java syntax, which is less readable in Scala.

This is not issue in Java, because it has no type inference, so it is clear that the first token is type and second token is identifier. If Scala used this syntax, it would not be so clear, because you can omit the type in some cases.

### Why does Scala use [] for generic types?
Todo...

### Why does Scala provide implicit classes instead of extension methods?
**JH: Possibly not a good Q for the FAQ section / too specific**

### What does _ (underscore) mean?
_ can be used in many places in Scala and its meaning depends on the context it is used. It usually means "I need to refer to something, but I don't need it so I won't give it a name". Examples:
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
* Less namespaces, allows replacing one with another
* Show Java program with same names (package, class, method, field, type, label, …)

### No special syntax for null?
null is not the problem, it’s a symptom of the problem:
overuse of null because it so convenient
null can mean different things (absent value, missing value, error condition), context lost.
NPEs

### What are Scala's Null, Nothing, None?
Null is the type for null value. (Notice the different case between “null” and “Null”.) It is subtype of any reference type.

Nothing is a type which has no value. Don’t confuse this with the Unit (or void) type. When some expression is a type of Nothing, it will never return. It will either throw an exception or never end. For this reason, Nothing is subtype of any other type. This makes expressions like the following one valid:

`if(x == 0) sys.error(“x shall not be zero”) else 5/x`

link to Scala's class hierarchy?

## JVM

### What do ops people you need to know to run Scala applications?
devops, compared to Java apps, “Just another jar file” etc.

### Garbage collection?
Todo...

## Web

### Can Scala run in the browser?
Yes. ...

**JH: I'd remove the Scala.js specific Qs and rather link to a separate article explaining the Scala/Web connection in more depth**

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

### Can Scala be used to write Android apps?
Todo...

**JH: Again I'd remove the Android specific Qs and link to a separate article explaining the Scala/Android connection in more depth**

### How large are Android apps written in Scala?
smallest size is about 1mb (vs. 50kb for java) everything else scales linearly

### Do processing steps like tree-shaking (removing unused code) slow down development?

### How can scala be used to improve android development?

### How do I build android apps using scala?

(sbt plugins, gradle plugins, maven plugins… ide support…)

### What versions of Scala can I use with Android?
2.8-2.11
