---
layout: page
title: Named Parameters

tutorial: scala-tour
num: 33
tutorial-previous: default-parameter-values
---

When calling methods and functions, you can use the name of the variables expliclty in the call, like so:

    def printName(first: String, last: String): Unit =
      println(first + " " + last)

    printName("John", "Smith")
    // prints "John Smith"
    printName(first = "John", last = "Smith")
    // prints "John Smith"
    printName(last = "Smith", first = "John")
    // prints "John Smith"

Note that once you are using parameter names in your calls, the order doesn't matter, so long as all parameters are named.
This feature works well with [default parameters](default-parameters):

    def printName(first: String = "John", last: String = "Smith"): Unit =
      println(first + " " + last)

    printName(last = "Jones")
    // prints "John Jones"

Since you can place the parameters in any order you like, you can use the default value for parameters that come first in the
parameter list.
