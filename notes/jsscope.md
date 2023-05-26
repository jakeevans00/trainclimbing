## Javascript DOM, Scope, Modules

#### DOM

Common things to do with DOM.

`document.createElement("div");`
`document.querySelector("#name)`
`document.getElementById("idname")`
`document.getElementsByClassName("navbar")`
`el.appendChild(child);`
`el.parentElement.removeChild(el);`

Attributes of selected elements:

- textContent
- innerText
- innerHTML
  - Not advised but replaces the selected element with the HTML you provide

Event Listeners

- All elements supoort the ability to attach a function that gets called when an event occurs on the element. These are called event listeners.
  EX:

```
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
```

This is another example of an event listener
`<button onclick='alert("clicked")'>click me</button>`

#### Scope

The browser has a this pointer, which refers to the Window. The Window is awesome. It is the overarching browser data structure that holds information about the viewport, the document, and a million other things.

> Scope Demo

```
'use strict';

// global scope
console.log('global:', this);
console.log('globalThis:', globalThis);

// function scope for a global function
function globalFunc() {
  console.log('globalFunctionThis:', this);
}
globalFunc();

// object scope
class ScopeTest {
  constructor() {
    console.log('objectThis:', this);
  }

  // function scope for an object function
  objectFunc() {
    console.log('objectFunctionThis:', this);
  }
}

new ScopeTest().objectFunc();

//RESULT
global: Window
globalThis: Window
globalFunctionThis: undefined
objectThis: ScopeTest
objectFunctionThis: ScopeTest
```

There are four types of scope:

1. Global - visible to all code
2. Module - Visible to all code running in a module
3. Function - Visible within a function
4. Block - Visible within a block of code delimited by curly braces

Var is deprecated because it doesn't respect block scope. See this example:

```
var x = 10;
console.log('start', x);

for (var x = 0; x < 1; x++) {
  console.log('middle', x);
}

console.log('end', x);

// OUTPUT: start 10
//         middle 0
//         end 1
```

Closures are a little more complicated: A function created in the closure's this pointer will be the object. However, an arrow function will return the globalWindow as its this. But a function inside an object that calls an arrow function will return the object as this. Remember that an arrow function's this is the context where the arrow function was created!

#### Modules

Modules were introduced with the introduction of Node.js. Modules create a file based scope for the code they represent. You must explicitly export the objects from one file and import to another file.

ex.
**alert.js**

```
export function alertDisplay(msg) {
  alert(msg);
}
```

**main.js**

```
import { alertDisplay } from './alert.js';

alertDisplay('called from main.js');
```

In the browser, you have to load a module by using the `type="module"` in your script tag. Then you have to expose your functions either by attaching an event handler or by attaching it to the global window object.

In modern frameworks, this doesn't really matter and it is mostly handled for you.
