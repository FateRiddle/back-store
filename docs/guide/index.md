---
order: 1
title: test
nav:
  order: 1
  title: guide
---

```jsx
import React from 'react';
import Global, { useGlobal } from '@gura/use-global';

const Wrapper = ({ children }) => <div>{children}</div>;

const Root = () => {
  return (
    <Global value={{ page1: { count: 1 }, page2: { count: 2 } }}>
      <Wrapper>
        <Wrapper>
          <Wrapper>
            <Wrapper>
              <App />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Global>
  );
};

const App = () => {
  const [store, setStore] = useGlobal('page1'); // getting global state from store
  const { count } = store;
  const plusOne = () => setStore({ count: count + 1 });
  const minusOne = () => setStore('count', count - 1);
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
