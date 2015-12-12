---
layout: page
title: Strings
tutorial: scala-tour
---

# Introduction

Strings are used to express textual data.

In a simplified approach Strings can be seen as sequences of characters.

## Simple String literals

They can be written literally in source code using double quotes:

    val emptyString1: String = ""
    val strAbc: String       = "abc"
    val emptyString2         = ""
    val strUvw               = "uvw"

The type `String` can be figured out by the Scala compiler, so it is optional to have the type specification `: String` as in the first two lines above.

## Special Characters

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

Lines in Strings used by Scala programs should usually be terminated by linefeed only.
This is the way to write platform independent software.
Conversion from <CR><LF> to <LF> and vice versa for reading and writing windows text files should be handled by the IO operations.

## 16-Bit-Unicode Characters

Create Strings containing a 16-Bit-Unicode character of a given numeric code:

     val uniCodeStr = "...\u73cf..."

The numeric code has to be provided as 4 digit hex-number.
Letters A..F may be used as upper case or lower case to express digits 10..15.

## Alternative Way to express Strings

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

## Empty String vs. `null`

Strings can have a length of zero characters, which is called "empty String".

It needs to be observed that an empty String is not the same as null.
And Some("") is not the same as None, when dealing with Options.

The maximum length of Strings is $$2^31-1=2147483647$$ characters.
It can be less depending on the content due to unicode issues.
This will be explained below in more detail.
The memory setup of the enviroment that Scala is running and the memory consumption of the program can limit the space available for very long Strings.
Highly memory consuming programs often fail due to the number and total size of the Strings that they are having in memory simultanously.

# Strings and Unicode

[Unicode](https://en.wikipedia.org/wiki/Unicode) is used for all Strings in Scala.
They are encoded in [UTF-16](https://en.wikipedia.org/wiki/UTF-16).
Strictly speaking they are comprised of code points.
Code Point is the Unicode term for referring to single Unicode characters.
Each code point is comprised of one or two code units.
Code units are 16 bits long and are referred to as characters (`Char`) by Scala.
So in order to avoid confusion with the different usage of the word "character" it is better to talk about "code points" and "code units".

The notation 0xAB07 will be used in the following sections to refer to numbers with a Hex-representation of AB07.
Code units with values `0x0000` to `0xD7FF` and `0xE000` to `0xFFFF` are used to express the code points with these numbers.
Code points above 0xFFFF are expressed by pairs of Code units between 0xD800 and 0xDFFF.
The Unicode standard states that positions 0xD800 to 0xDFFF will never be used for code points, so that this encoding will never become ambigous.
So for them using the terms code point, character and code unit interchangably would be possible.
Since most strings in real world programs only contain string data comprised of these, the assumption that strings are comprised of 16-bit characters works sufficiently well for expressing current European languages.
It is recommended to observe that Unicode code points above 0xFFFF might be needed in future versions of the software.
It will be hard to rewrite the software if this is not observed already from the beginning.

## Consistency of Strings with Unicode

Scala allows Strings to consist of any sequence of 16-Bit code units and it is possible to create Strings containing a single code unit in the range 0xD800 to 0xDFFF, although they are only allowed to occur in pairs by the standard.
So this is forbidded by the standard, but accepted by Scala:

    val bad1 = "\uD800"
    val bad2 = "\uDFFF"
    val bad3 = "uv\uDFFFxy"

It is the responsibility of the application developer to make sure that only valid UTF-16 Strings are created literally or through software calculations.

## Literal Strings and Unicode

Scala supports code points above 0xFFFF only through specification of two adjacent `\u`-entries:

    val good = "\uD834\uDD1E"

This expresses the code point U+1D11E (0x1D11E).
