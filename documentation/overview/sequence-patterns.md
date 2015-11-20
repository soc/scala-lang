---
layout: page
title: Sequence Patterns
tutorial: scala-tour
num: 14

tutorial-next: extractor-objects
tutorial-previous: xml-processing
---

## Right-ignoring sequence patterns

Right-ignoring patterns are a useful feature to decompose any data which is either a subtype of `Seq[A]` or a case class with an iterated formal parameter, like for instance

    Elem(prefix: String, label: String, attrs: MetaData, scp: NamespaceBinding, children: Node*)

In those cases, Scala allows patterns having a wildcard-star `_*` in the rightmost position to stand for arbitrary long sequences.
The following example demostrate a pattern match which matches a prefix of a sequence and binds the rest to the variable `rest`.

    object RegExpTest1 extends App {
      def containsScala(x: String): Boolean = {
        val z: Seq[Char] = x
        z match {
          case Seq('s','c','a','l','a', rest @ _*) =>
            println("rest is "+rest)
            true
          case Seq(_*) =>
            false
        }
      }
    }
