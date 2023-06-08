## Web Frameworks

Used for a few reasons:

1. Modularize code
2. Increasing speed
3. Simplifying common tasks

**React**

Makes reactive pages based on user interactions or changes in data

- Created by Jordan Walke in 2011
- Abstracts HTMLinto a JS variate called JSX. It is converted into valid HTML and JS using a preprocessor called Babel

simple example:

```
const i = 3;
const list = (
  <ol class='big'>
    <li>Item {i}</li>
    <li>Item {3 + i}</li>
  </ol>
);
```

becomes

```
const i = 3;
const list = React.createElement(
  'ol',
  { class: 'big' },
  React.createElement('li', null, 'Item ', i),
  React.createElement('li', null, 'Item ', 3 + i)
);
```

In JSX you insert components using a `<tag/>` that refers to a function.
You can pass in parameters which are read out as "props"
ex:

```
<div>Component: <Demo who="Walke" /><div>

function Demo(props) {
  return <b>Hello {props.who}</b>;
}
```

Note: you can use JSX without a function. You could just pass in a variable

#### State

An important concept that leverages the `React.useState` hook function. This returns two variables -> one that contains the current state and the other to update it. Here is a simple example:

```
const Clicker = () => {
  const [clicked, updateClicked] = React.useState(false);

  const onClicked = (e) => {
    updateClicked(!clicked);
  };

  return <p onClick={(e) => onClicked(e)}>clicked: {`${clicked}`}</p>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```

In addition to the function components, you might see class components. The main difference (these are less used now) is that state must be set using the `setState` method.

#### Toolchains

Some common tools used to abstract away complexity and streamline development

- **Code repository** - Stores code in a shared, versioned, location.
- **Linter** - Removes, or warns, of non-idiomatic code usage.
- **Prettier** - Formats code according to a shared standard.
- **Transpiler** - Compiles code into a different format. For example, from JSX to JavaScript, TypeScript to JavaScript, or SCSS to CSS.
- **Polyfill** - Generates backward compatible code for supporting old browser versions that do not support the latest standards.
- **Bundler** - Packages code into bundles for delivery to the browser. This enables compatibility (for example with ES6 module support), or performance (with lazy loading).
- **Minifier** - Removes whitespace and renames variables in order to make code smaller and more efficient to deploy.
- **Testing** - Automated tests at multiple levels to ensure correctness.
- **Deployment** - Automated packaging and delivery of code from the development environment to the production environment.

For our project we use:

- Github as repo
- Vite for JSX, TS dev and debugging support
- ESBUILD for converting to ES6 modules and Babel for transpiling
- Rollup for bundling and tree shaking
- PostCSS for CSS transpiling
