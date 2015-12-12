---
layout: page
title: Strings
tutorial: scala-tour
---

Strings are used to express textual data.

In a simplified approach Strings can be seen as sequences of characters.

They can be written literally in source code using double quotes:

    val emptyString1: String = ""
    val strAbc: String       = "abc"
    val emptyString2         = ""
    val strUvw               = "uvw"

The type `String` can be figured out by the Scala compiler, so it is optional to have the type specification `: String` as in the first two lines above.

Some special characters can expressed in these string literals using sequences starting with `\`:

     val backspace = "\b" // create Strings containing backspace


They can have a length of zero characters, which is called empty String.

It needs to be observed that an empty String is not the same as null.

The maximum length of Strings is $$2^31-1=2147483647$$ characters. 
It can be less depending on the content due to unicode issues.  
This will be explained below in more detail.
The memory setup of the enviroment that Scala is running and the memory consumption of the program can limit the space available for very long Strings.
Highly memory consuming programs often fail due to the number and total size of the Strings that they are having in memory simultanously.

