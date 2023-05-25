## Javascript DOM, Scope, Modules

#### DOM

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
```

For closures created in arrow functions, the this pointer is still the object where the function was created.
