---
layout: page
title: General
---

### What is Scala?

http://scala-lang.org/what-is-scala.html

### What is Scala’s history?

Maybe http://www.artima.com/weblogs/viewpost.jsp?thread=163733 or https://www.artima.com/scalazine/articles/origins_of_scala.html ?

### What is the current focus of the work on Scala?
Java 8 support, focus on compatibility between 2.11 and 2.12, etc.

### What are the plans for the future?

TASTY, dotty, DOT, mechanized soundness proof, SBT 1.0, union/intersection types, singleton types, optimizations, macros, ...

### Is Scala harder to use than X?
No => show list of things Scala doesn’t have or simplifies, but harder to learn, because ...
Something along the lines of:
During the debate, I think there was a great question/comment about Scala being not too "separable" in terms of learning concepts of the language: https://youtu.be/xUWNcL7NRxg?t=29m40s

I just want to add another thought to the question and the answers that followed:

Our strive to have a dense feature interaction matrix kind of clashes with the desire to have a language with easily separable pieces, so the problems are inherent in our approach. In my opinion the lesson is not to abandon this philosophy, but to make sure that explanations and documentation goes the extra mile, which might not be necessary in less coherent languages.

This could also explain a bit why people say "Scala is hard, ... but I can kind of deal with C#", despite C# being a great definition of a kitchen sink language: C# has so many features which can't be combined with each other that the individual bits and pieces feel more manageable, and question like "what happens when I combine A with B and leverage C in addition?" (answer: you can't, it's probably already falling apart at step B) never need to be considered.

What do you think?

Martin: Yes, I think that's spot on. Orthogonality of features makes a language harder to learn. 