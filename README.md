# useStore

Minimalist state management tools only for React.js

## Features

- Progressive adoption
- Minimalist api
- Extremely reusable

```js
import React from 'react';
import Store, { useStore } from 'back-store';
const Root = () => {
  return (
    <Store value={{ page1: { count: 1 }, page2: { a: { b: 'hello' } } }}>
      <App />
    </Store>
  );
};

const App = () => {
  const [store, setStore] = useStore('page1'); // getting Store state from store
  const { count } = store;
  const plusOne = () => setStore({ count: count + 1 }); // just like setState
  const plusTen = () => setStore(store => ({ count: count + 10 })); // support function
  const minusOne = () => setStore('count', count - 1); // lodash.set like syntax for possible deep structure setStore('a.b.c', xx)
  return (
    <div>
      <div>{count}</div>
      <button onClick={plusOne}>+</button>
      <button onClick={plusOne}>+10</button>
      <button onClick={minusOne}>-</button>
    </div>
  );
};

export default Root;
```

## CHANGELOG

### v1.1.0

添加函数式调用
