---
layout: page
title: Context Bounds
disqus: true
tutorial: scala-tour
num: 21
tutorial-next: abstract-types
tutorial-previous: lower-type-bounds
by: Based on Daniel C. Sobral's response to [What are Scala context and view bounds?](http://stackoverflow.com/q/4465948/53013) (CC-BY-SA 3.0)
---

Context bounds are typically used with the so-called _type class pattern_.
A context bound like `Numeric` on a type parameter `T` looks like this:

    T : Numeric

While upper bounds constrain `T` to be a subtype of the upper bound,
context bounds also constrain the `T` albeit in a more flexible fashion.
`T : Numeric` can be read as "a `T` which supports numeric operations".

It is used to declare that for some type `A`, there is an
implicit value of type `B[A]` available. The syntax goes like this:

    def f[A : B](a: A) = g(a) // where g requires an implicit value of type B[A]

The common example of usage in Scala is this:

    def f[A : reflect.ClassTag](n: Int) = new Array[A](n)

An `Array` initialization on a parameterized type requires a `ClassManifest` to
be available, for arcane reasons related to type erasure and the non-erasure
nature of arrays.

Another very common example in the library is a bit more complex:

    def f[A : Ordering](a: A, b: A) = implicitly[Ordering[A]].compare(a, b)

Here, `implicitly` is used to retrive the implicit value we want, one of type
`Ordering[A]`, which class defines the method `compare(a: A, b: A): Int`.

We'll see another way of doing this below.

How are Context Bounds implemented?
---------------------------------------------------

The syntax shown above is syntactic sugar for and additional implicit parameter.
The next two lines are equivalent:

    def g[A : B](a: A) = h(a)
    def g[A](a: A)(implicit ev: B[A]) = h(a)

So, naturally, one can write them in their full syntax, which is specially
useful for context bounds:

    def f[A](a: A, b: A)(implicit ord: Ordering[A]) = ord.compare(a, b)

What are Context Bounds used for?
---------------------------------

Context bounds provide an alternative to inheritance by making functionality
available without requiring an existing subtyping relationship.

An example is Scala `Ordering`:

    def f[A : Ordering](a: A, b: A) = if (implicitly[Ordering[A]].lt(a, b)) a else b

Though you'll usually see that written like this:

    def f[A](a: A, b: A)(implicit ord: Ordering[A]) = {
        import ord._
        if (a < b) a else b
    }

* [A discussion on types, origin and precedence of implicits](finding-implicits.html)
* [Chaining implicits](chaining-implicits.html)
