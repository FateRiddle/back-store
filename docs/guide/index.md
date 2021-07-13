---
order: 1
title: getting started
nav:
  order: 1
  title: guide
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <img src="https://img.alicdn.com/imgextra/i3/O1CN01dxRZQ61z7XGPRbNeN_!!6000000006667-2-tps-200-200.png" alt="logo" width="48px"/>
  <span style="font-size:30px;font-weight:600;display:inline-block;margin-left:12px">FormRender</span>
</div>
<p style="display:flex;justify-content:space-between;width:440px">
  <a href="https://www.npmjs.com/package/form-render?_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/form-render.svg?maxAge=3600&style=flat-square">
  </a>
  <a href="https://npmjs.org/package/form-render">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/form-render.svg?style=flat-square">
  </a>
  <a href="https://npmjs.org/package/form-render">
    <img alt="NPM all downloads" src="https://img.shields.io/npm/dt/form-render.svg?style=flat-square">
  </a>
  <a>
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

## Usage

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import Store, { useStore } from 'back-store';

// project root component
const Root = () => {
  return (
    <Store value={{ count: 1 }}>
      <App />
    </Store>
  );
};

// get/set global states in any component
const App = () => {
  const [store, setStore] = useStore();
  const { count } = store;

  const plusOne = () => setStore({ count: count + 1 });
  const minusOne = () => setStore({ count: count - 1 });
  const setRandom = () => setStore('a.b.c', Math.random());
  const setStateWithFunction = () => {
    setStore(store => {
      return {
        count: store.count + 10,
      };
    });
  };

  return (
    <>
      <h1>{JSON.stringify(store)}</h1>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
      <button onClick={setRandom}>setting state of deep structure</button>
      <button onClick={setStateWithFunction}>+10 using function</button>
    </>
  );
};

export default Root;
```

## Motivation

For newcomers, one of the great barrier in React.js is learning how to use a state management tool (typically redux) to write "real world" complex apps. Why does it feel so hard? (for the discussion I'll use redux as example)

1. **Redundent layer of abstruction.** We are getting used to "dispatch action" model, but so often I find myself dispatching an action `showModal`, only to set a state called `modalVisible` from `false` to `true`. React state is enough abstruction, another layer of abstruction on top of it can be redundent.

2. **Re-learn how to write async code.** It's also a redux design choice to keep any side-effect(like async data fetching) out of its core loop, that results you to re-learn how to write async code to cope with redux, and picking up another library like `redux-thunk` no less. This also makes refactoring out of/into redux costly, which lead to our final point

3. **Hardly reusable**. It's always easy to reuse a pure component, but so often we want to reuse something with state & logic. If you're trying to reuse a page written in redux in another "normal" react app, good luck with that.

Does it struck you that managing state **shouldn't be so hard**?

- All we want(most of the time) is a global store to store some global states, then having get/set method to fetch/update those global state from anywhere in your project.

* Also logically, getting/setting global states shouldn't felt any different from getting/setting local states in api design. So ideally we'll be having a similar api to `this.setState` & `useState` for global states managing, something like:

```js
// local
this.setState({ text: 'hello' });
// global
setGlobal({ text: 'hello' });

// local
const { text } = this.state;
//global
const { text } = globalState;
```

Thus `back-store` is born.

## Install

```sh
tnpm i -S back-store
```

## Adopting in a real project

### Step 1

- wrapping your `<App />` inside the context provider `Store`

```js
import React from 'react';
import Store from 'back-store';

const initialState = {
  page1: { count: 1 },
  page2: { a: { b: { text: 'hello' } } },
};

const Root = () => {
  return (
    <Store value={initialState}>
      <App />
    </Store>
  );
};
```

### Step 2

Profit (anywhere! )

```js
// Anywhere inside <App />
import { useStore } from 'back-store';
const Counter = () => {
  const [store, setStore] = useStore('page1'); // getting Store state from store
  const { count } = store;
  const plusOne = () => setStore({ count: count + 1 });
  const minusOne = () => setStore({ count: count - 1 });
  return (
    <div>
      <div>{count}</div>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
    </div>
  );
};
```

Below is the complete running demo for the above code:

<code src='./demo/index.jsx' />

## Features

1. **`lodash.set` like syntax for deep structures**

```js
// Anywhere inside <App />
import { useStore } from 'back-store';
const Something = () => {
  const [store, setStore] = useStore('page2');
  const changeText = () => setStore('a.b.text', 'hello world!');
  return (
    <div>
      <p>{store.a.b.text}</p>
      <button onClick={changeText}>click me</button>
    </div>
  );
};
```

2. **simple Api**

You actually don't need to declare anything, and everything'll still work(inital global state will be undefined of course). This is perfect for quick refactoring

```js
import React from 'react';
import Store from 'back-store';

const Root = () => {
  return (
    <Store>
      <App />
    </Store>
  );
};
```

3. **Highly reusable**

What it takes to move a "back-store powered" component to another normal react.js project?

```js
import React from 'react';
import Store from 'back-store';
// wrap your wrapper
const Root = () => {
  const initialStatesForReusableComponent = { data: 123, name: 'hello' };

  return (
    <Store value={initialStatesForReusableComponent}>
      <AnotherProject />
    </Store>
  );
};

// ReusableComponent is a component straight taking out of a back-store project
const AnotherProject = () => (
  <div>
    <ReusableComponent />
  </div>
);
```

4. Writing async code now, in a way you've already known

See [Handling async code](/guide/async)
