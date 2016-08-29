---
layout: page
title: Common Questions – Language
---

[Back to the index]({{ site.baseurl }}/documentation/faq)

## Language

### Why is `ident: Type` better than `Type ident`? {#ident-type-syntax}

Given that Scala is an expressive language, developers generally need to use less temporary variables.
This means that we have fewer, but more important names, and Scala let's developers focus on them by placing them first.

As Scala has type inference (which means that the compiler can figure out types on its own) it also ensures that the names can be found at a glance, regardless of whether you write they type down or let it be inferred by the compiler:

```
val x: String = "hello"
val y: Int = 23
val z = 42

// vs.

val String x = "hello"
val Int y = 23
val z = 42
```

We have found three desirable syntactic properties which we want to have:

**Input before output**

The `i: Int` syntax naturally leads to a method syntax where the inputs (parameters) are defined before the output (result type), which in turn leads to more consistency with lambdas (whose inputs are also defined before its output).

**Consistency between definition and usage**

The way a method is defined should mirror the way it can be used. (See [Why is `[]` better than `<>` for generic types?](#why-is--better-than--for-generic-types))

**Definition before usage**

A generic type parameter should be declared before it is used. Otherwise it's hard to tell to what a type argument refers to:

```
class Id<T>() {
  T id<T>(T \ivalue) { ... } // Does T refer to the class' <T> in scope,
}                            // or to the method's <T> that comes after it?
```

As languages have explored various designs, we can check whether they satisfy the three desirable properties mentioned above:

**Java**

```
<T> T id(T value) { ... }
```

**Kotlin**

```
fun <T> id(value: T) { TODO() }
```

**Ceylon**

```
T id<T>(T \ivalue) { ... }
```

**Scala**

```
def id[T](value: T): T = ???
```

Scala's design choice is the only one that delivers all three desirable properties:

|              | Input before output | Definition-usage consistency | Definition before usage |
|--------------|:-------------------:|:----------------------------:|:-----------------------:|
| ***Java***   | No                  | No                           | Yes                     |
| ***Kotlin*** | Yes                 | No                           | Yes                     |
| ***Ceylon*** | No                  | Yes                          | No                      |
| ***Scala***  | Yes                 | Yes                          | Yes                     |
{: style="width:100%"}

### Why is `[]` better than `<>` for generic types? {#brackets}

Many languages that were created without generics in mind have trouble adding generics later on, as all pairs of brackets, `(` and `)`, `{` and `}`, `<` and `>`, have already been put to use.

Of that group, `<` and `>` are usually the only symbols left that are practical to overload with a new, different meaning (`<` and `>` are often employed as binary operators expressing comparisons or bitshift operations, not as brackets).
Unfortunately, even `<` and `>` have troubling parsing issues that require workarounds. While parsing should be solely considered a problem for compiler writers, it is often the case that things that are hard to parse for machines are often hard to read for humans, too.

The general issue is that it's hard to tell for the compiler, given a token stream of `instance . foo <`, whether this is the left side of a comparison and `<` is a binary operator or the start of a generic type argument within a method call.

Some languages try to avoid this issue by making the syntax less consistent: As an example, Java's syntax for _defining_ and _using_ generics in instance methods is completely different due to this issue:

```
<T> void foo<T>() { ... } // definition: generics after method name
instance.<String>foo()    // usage: generics before method name
```

Other languages like C# try to retain a more consistent syntax by introducing unlimited look-ahead: The parser will keep reading input after the `<` until it can make a decision.

Scala was designed with generics from the start and doesn't suffer these issues.

- The usage of a generic type mirrors it's definition:

```
class Foo[T]
new Foo[String]
def foo[T] = ???
foo[String]
```

- In Scala, the use of brackets is straight-forward and easy to understand:
  - Whenever you see `[]`, you know that everything in between is a type.
  - Whenever you see `()`, you know it is a parameter list, a single expression or a tuple.
  - Whenever you see `{}`, you know it is a block that can contain multiple statements and definitions.

Additionally, having type parameters (`[T]`) next to value parameters (`(value: T)`) makes generics feel less "special":
Scala has zero or one parameter lists for types and zero or more parameter lists for values. This helps getting beginners up to speed and improves upon languages in which generics are completely pushed into "advanced" parts of tutorials.

### Why doesn't Scala have special syntax for `new`? {#new}

On many platforms, including the JVM, the creation of a new instance has very specific semantics,
both on the language-level and on the level of the memory model, which both restrict and complicate the usage of `new`.

**Why not express instance creation without the `new`?**

Scala tries to be explicit about these special semantics by requiring the use of the `new` keyword,
instead of e. g. allowing `ClassName()` to stand in for `new ClassName()`.

Additionally, if Scala considered `ClassName()` to be a constructor invocation, this syntax wouldn't work for interfaces.

Scala's design approach considers the following points:

- **Explicit** – Special operations should be explicit.
- **Focused** – The task of a constructor is to return a valid instance by initializing the fields of the instance with the arguments passed to the constructor invocation, not arbitrary work like parsing inputs or computing values.

Instead of allowing complicated initialization logic with multiple, overloaded constructors,
Scala encourages the use of explicitly named factory methods in companion objects:

- **Named** – As factory methods are just normal methods, they can be named appropriately. If a method involves parsing data from a `String`, the name can express it.
- **General** – Both classes and interfaces can have companion objects, and therefore factory methods.
- **Flexible** – Factory methods, unlike constructors, can decide which type they return and whether they create a new instance or return a cached value: If construction could fail, they can communicate this fact clearly with `Option[ClassName]` instead of throwing an exception. If a different class should be used depending on the inputs, factory methods can do that. If the method receives the same inputs multiple times, it can return an existing instance.
- **Concise** – As factory methods are the encouraged design approach in Scala, they can make use of the "best syntax": `ClassName(arg1, arg2, ...)`.


### Why are implicit classes better than extension methods? {#extension-methods}

Extension methods are a subset of implicit classes, albeit not a particularly useful one:

Practical experience has shown that the capabilities of implicit classes are not an optional add-on to extension methods, but are essential for the usefulness of this language feature in real-world scenarios.

Introducing extension methods has been considered in Scala, but was rejected as they don't provide enough benefits to justify adding the to the language: In most cases methods don't stand on their own, but are used to implement existing interfaces.

Extension methods and implicit classes share a big disadvantage:

- Members that are added to a type look as if they were dynamically dispatched on the instance `instance.someExtensionMethod(arg)`, although they are statically dispatched like static methods.

Advantages of extension methods:

- Often more concise syntax than implicit classes for adding single methods to a type.

Advantages of implicit classes:

- More concise syntax when adding multiple methods to a type.
- Can inherit and reuse existing implementations.
- Can make types implement new interfaces.
- Added methods can never go out of sync with the interface they are intended to implement.

### What does `_` (underscore) mean?

It means *I need to refer to something, but I don't care about giving it a name*.

### Why can’t I define a variable and a method with the same name? {#namespaces}

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

### Why doesn't Scala provide special syntax for `null`? {#null}

-> Adapt [https://lobste.rs/s/4z7vci/null_is_not_issue/comments/lfysiq#c_lfysiq](https://lobste.rs/s/4z7vci/null_is_not_issue/comments/lfysiq#c_lfysiq).

### What are Scala's `Null`, `Nothing`, `None`, `Nil`? {#bottom-types}

They are items of the standard library.

[**`Null`**](http://www.scala-lang.org/api/#scala.Null) is the type of `null`. It is currently a subtype of all reference types.

```
val nullValue1 = null       // inferred
val nullValue2: Null = null // explicit
```
<br/>
[**`Nothing`**](http://www.scala-lang.org/api/#scala.Nothing)) is a type which has no value. When some expression is of type `Nothing`, it will never return: It will either throw an exception or go into an infinite loop.

```
def eventLoop(): Nothing = while (true) { ... }
```

For this reason, `Nothing` is subtype of any other type. This makes expressions like the following one valid:

```
def divide(x: Int): Int = if(x == 0) sys.error(“x shall not be zero”) else 5/x
```
<br/>
[**`None`**](http://www.scala-lang.org/api/#scala.None$) is the singleton value of an empty `Option`. It is a subtype of `Option`.

```
val none = Option(null) // Option(null) returns None
```
<br/>
[**`Nil`**](http://www.scala-lang.org/api/#scala.collection.immutable.Nil$) is the singleton value of an empty `List`. It is a subtype of `List`.

```
val emptyList = List() // List() returns Nil
```
