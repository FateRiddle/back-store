# useGlobal

Minimalist state management tools only for React.js

## Features

- Progressive adoption
- Minimalist api
- Extremely reusable

```js
import React from 'react';
import Global, { useGlobal } from '@ali/use-global';
const Root = () => {
  return (
    <Global value={{ page1: { count: 1 }, page2: { a: { b: 'hello' } } }}>
      <App />
    </Global>
  );
};

const App = () => {
  const [store, setStore] = useGlobal('page1'); // getting global state from store
  const { count } = store;
  const plusOne = () => setStore({ count: count + 1 }); // just like setState
  const minusOne = () => setStore('count', count - 1); // lodash.set like syntax for possible deep structure setStore('a.b.c', xx)
  return (
    <div>
      <div>{count}</div>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
    </div>
  );
};

export default Root;
```
