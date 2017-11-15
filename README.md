# DOM
Lightweight dom abstraction library, because sometimes jQuery is just overkill. This library provides methods for the most common DOM tasks.
This code is also fairly simple, so could be used as learning tool. 

## Usage

Create a DOM object
```
var element = DOM(selector);
```

Like jQuery all the methods are chainable.

```
DOM('.container').find('li').html('Hello, world');
```

## Available Methods
#### each(function(el, index)) -> DOM object

loop through all the elements.

#### find(selector) -> DOM object

Search further down the tree based on the current context.

#### value([value]) -> String (or DOM object if no param)

Set the value of the inputs in the current context.

#### html([value]) -> String (or DOM object if no param)

Get the html of first element in the context or set the html of all the elements in the context.

#### attribute(attribute, value) -> String (if just first param) DOM object (if two param e.g. setting attribute)

 Get the value for an attribute of first element in the context or set the attribute value of all the elements in the context.

#### append(String or Node) -> DOM object

Append a HTML string or DOM Node at the end of all the elements.

#### prepend(String or Node) -> DOM object

Append a HTML string or DOM Node at the start of all the elements.

#### on(eventType, listener, [useCapture]) -> DOM object

Bind event to all the elements.

#### off(eventType, listener, [useCapture]) -> DOM object

Unbind an event on all the elements.

#### ready(listener) -> DOM object

Wrapper method for detecting the Dom is ready to be used.
