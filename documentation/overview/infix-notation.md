---
layout: page
title: Infix Notation
tutorial: scala-tour
num: 29
tutorial-next: automatic-closures
tutorial-previous: local-type-inference
---

Any method which takes a single parameter can be used as with *infix notation* in Scala. Here is the definition of class `MyBool` which defines three methods `and`, `or`, and `negate`.

    class MyBool(x: Boolean) {
      def and(that: MyBool): MyBool = if (x) that else this
      def or (that: MyBool): MyBool = if (x) this else that
      def negate: MyBool = new MyBool(!x)
    }

It is now possible to use `and` and `or` with infix notation:

    def not(x: MyBool) = x.negate
    def xor(x: MyBool, y: MyBool) = (x or y) and not(x and y)

The second line defines an `xor` function using the `and` and `or` methods as well as the new `not` function. In this example the use of _infix notation_ helps to make the definition of `xor` more readable.

Here is the corresponding code in a more traditional object-oriented programming language syntax:

    def xor(x: MyBool, y: MyBool) = x.or(y).and(x.and(y).negate)
