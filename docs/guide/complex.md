---
order: 3
title: complex code
nav:
  order: 1
  title: guide
---

## complex code example

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useEffect } from 'react';
import Store, { useStore } from 'back-store';

// project root component
const Root = () => {
  return (
    <Store value={{ page1: { count: 1 }, page2: { text: 'hello' } }}>
      <Page1 />
      <Page2 />
    </Store>
  );
};

const Page1 = () => {
  const [store, setStore] = useStore('page1');
  const { count } = store;

  const plusOne = () => {
    setStore({ count: store.count + 2 });
    setStore(store => {
      return { count: store.count + 3 };
    });
  };
  const minusOne = () => setStore({ count: count - 1 });
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
      <button onClick={plusOne}>+5</button>
      <button onClick={minusOne}>-1</button>
    </>
  );
};

const Page2 = () => {
  const [store, setStore] = useStore('page2');
  const { count } = store;

  useEffect(() => {
    setText({ text: 'hello world' });
  }, []);
  const setText = text => setStore({ text });

  return (
    <>
      <h1>{JSON.stringify(store)}</h1>
      <button onClick={() => setText('new world')}>new world</button>
    </>
  );
};

export default Root;
```
