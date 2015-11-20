---
layout: page
title: Design
---

### Why does Scala use ident: Type instead of Type ident?

The “ident: Type” syntax allows Scala to be more consistent when type inference is used. It might be better visible on an example:

(1 to 10).map((x: Int) => x*x) // uses explicit type annotation
The snippet is unnecessarily verbose, because the compiler knows that parameter x must be of type Int. It can be rewritten with type inference
(1 to 10).map((x) => x*x) // same meaning as above, but it uses type inference

If Scala used the “Type ident” syntax, the explicit type annotation would look like this:
(1 to 10).map((Int x) => x*x) // uses explicit “Type ident” type annotation (hypothetical syntax)
This syntax is less readable in Scala. This is not issue in Java, because it has no type inference, so it is clear that the first token is type and second token is identifier. If Scala used this syntax, it would not be so clear, because you can omit the type in some cases.

### Why does Scala use [] for generic types?

### Why does Scala have nicer syntax for context bounds than upper bounds?

### Why does Scala provide implicit classes instead of extension methods?

### What does _ do?
I think we should have something more like “I want to refer something, but I don’t want to give it a name”. I think I saw an explanation out there which managed to fit all uses into that description.

/*You can consider _ to be something like pronoun. The exact meaning of _ depends on context.
import something._ – it means “everything” (similar to * in Java)
case (“a”, _) => – it means “anything”
.map(_*2) – it means “the value” and the expression _*2 is a partial application. The snippet can be rewritten to .map(x => x*2)
.map((_: Int) * 2) the same as above, but with explicit (non-infered) type annotation*/

### Why can’t I define both a variable and a method with the same name?
=> Less namespaces, allows replacing one with another
=> Show Java program with same names (package, class, method, field, type, label, …)

### No special syntax for null?
null is not the problem, it’s a symptom of the problem:
overuse of null because it so convenient
null can mean different things, context lost.
NPEs

### Null, Nothing, None
Null is the type for null value. (Notice the different case between “null” and “Null”.) It is subtype of any reference type.

Nothing is a type which has no value. Don’t confuse this with the Unit (or void) type. When some expression is a type of Nothing, it will never return. It will either throw an exception or never end. For this reason, Nothing is subtype of any other type. This makes expressions like the following one valid:

if(x == 0) sys.error(“x shall not be zero”) else 5/x
