## Javascript Promises, Async/await

Javascript is single-threaded, meaning that only 1 piece of code can execute at a time. However, you can execute in parallel (though not concurrently). This is done through Javascript Promises.

#### Promises

Promises can be in one of three states: 1. pending - currently running asynchronouosly; 2. fulfilled; 3. rejected

Here is an exmaple of the asynchronous nature of a promise

```
const delay = (msg, wait) => {
  setTimeout(() => {
    console.log(msg, wait);
  }, 1000 * wait);
};

new Promise((resolve, reject) => {
  // Code executing in the promise
  for (let i = 0; i < 3; i++) {
    delay('In promise', i);
  }
});

// Code executing after the promise
for (let i = 0; i < 3; i++) {
  delay('After promise', i);
}

// OUTPUT:
//   In promise 0
//   After promise 0
//   In promise 1
//   After promise 1
//   In promise 2
//   After promise 2
```

You now want to do something depending on the success of the function. (reolves or rejects)
This is done as follows:

```
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('success');
    } else {
      reject('error');
    }
  }, 10000);
});
```

**Then, Catch, and Finally**

1. You can execute asyncronously
2. You can have 2 return states
3. You can use then, catch, and finally to handle results of return states (all possible states)

Observer pattern is another way of getting this done

#### Async

Promises can be verbose and can create a confusing set of callbacks if too many promises are chained. The Async/await syntax can make this a lot more legible!

Then/catch version of prior code ^^^

```
coinToss()
  .then((result) => console.log(`Toss result ${result}`))
  .catch((err) => console.error(`Error: ${err}`))
  .finally(() => console.log(`Toss completed`));
```

async, try/catch version

```
try {
  const result = await coinToss();
  console.log(`Toss result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log(`Toss completed`);
}
```

Await cannot be used except at the top level of the JS file or in a function defined with the `async` keyword

- The `async` keyword declares a function that returns a promise
- The `await` keyword wraps an async call and blocks execution until the promise is returned

one last example

```
const httpPromise = fetch('https://simon.cs260.click/api/user/me');
const jsonPromise = httpPromise.then((r) => r.json());
jsonPromise.then((j) => console.log(j));
console.log('done');

// OUTPUT: done
// OUTPUT: {email: 'bud@mail.com', authenticated: true}
```

becomes

```
const httpResponse = await fetch('https://simon.cs260.click/api/user/me');
const jsonResponse = await httpResponse.json();
console.log(jsonResponse));
console.log('done');

// OUTPUT: {email: 'bud@mail.com', authenticated: true}
// OUTPUT: done
```
