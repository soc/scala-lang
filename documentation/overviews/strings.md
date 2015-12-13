---
layout: page
title: Strings
tutorial: scala-tour
---

== Introduction == 

Strings are used to express textual data.

In a simplified approach Strings can be seen as sequences of characters.

They can be written literally in source code using double quotes:

    val emptyString1: String = ""
    val strAbc: String       = "abc"
    val emptyString2         = ""
    val strUvw               = "uvw"

The type `String` can be figured out by the Scala compiler, so it is optional to have the type specification `: String` as in the first two lines above.

Some special characters can expressed in these string literals using sequences starting with `\`:

Create Strings containing backspace (Ctrl-H or character 8):

     val backspace = "...\b..."

Create Strings containing formfeed (Ctrl-L or character 12):

     val formfeed  = "...\f..."

Create Strings containing linefeed (newline or <LF> or Ctrl-J or character 10):

     val linefeed  = "...\n..."

Create Strings containing linefeed (carriage return or <CR> or Ctrl-M or character 13):

     val cr        = "...\r..."

Create Strings containing tabulator (tab or Ctrl-I or character 9):

     val tab       = "...\t..."

Create Strings containing a double quote ("):

     val dquote    = "...\"..."

Create Strings containing a single quote ('):

     val squote1   = "...\'..."

Create Strings containing a single quote ('):

     val squote2   = "...'..."

The \ in front of the single quote is optional in strings, but since single characters are enclosed in single quotes, it is needed there.

Create Strings containing one backslash (\\):

     val squote2   = "...\\..."

Create Strings containing a 16-Bit-Unicode character of a given numeric code:

     val uniCodeStr = "...\u73cf..."

The numeric code has to be provided as 4 digit hex-number.
Letters A..F may be used as upper case or lower case to express digits 10..15.

Lines in Scala programs should usually be terminated by linefeed only.
This is the way to write platform independent software.
Conversion from <CR><LF> to <LF> and vice versa for reading and writing windows text files should be handled by the IO operations.

Another way to express Strings is by enclosing them in triple quotes:

    val tripleQuoted = """abc def"""

In this case, backslashes are usually not interpreted specially, but are just becoming part of the string literally:

    val tripleQuotedWithBackslash = """\a\b\c"""

But \u is interpreted in triple quoted strings as well:

    val tripleQuotedWithUnicode = """...\u73CF..."""

To get a literal \u into the string, a workaround like this can be used:

    val tripleWithBackslashU = """...\""" + """u..."

Strings with triple quote may be muliple lines long:

    val paragraph = """line 1
line 2
line 3
"""

Strings can have a length of zero characters, which is called "empty String".

It needs to be observed that an empty String is not the same as null.
And Some("") is not the same as None, when dealing with Options.

The maximum length of Strings is $$2^31-1=2147483647$$ characters. 
It can be less depending on the content due to unicode issues.  
This will be explained below in more detail.
The memory setup of the enviroment that Scala is running and the memory consumption of the program can limit the space available for very long Strings.
Highly memory consuming programs often fail due to the number and total size of the Strings that they are having in memory simultanously.

== Strings and Unicode ==

