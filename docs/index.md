---
hero:
  title: back-store
  desc: Minimalist state management library based on React.js hooks
  actions:
    - text: Getting Started
      link: /guide
features:
  - icon: https://img.alicdn.com/imgextra/i3/O1CN01dxRZQ61z7XGPRbNeN_!!6000000006667-2-tps-200-200.png
    title: Progressive Adoption
    desc: a few lines of code & it's set for any React project, co-exist with any state management libraries
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: Minimalist Api
    desc: Zero boilerplate code, intuitive usage just like using native `setState`, but works for global states
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: Extremely Reusable
    desc: reusing components powered by back-store in another project without deep refactoring
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: Async, No Problem
    desc: No react-saga/react-thunk etc., zero refactoring needed for `async code`
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: Visual Development Tools
    desc: with 'debug=true' props, a visual display of states on the fly
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: TypeScript Support
    desc: not a big fan of TypeScript, we support it nevertheless
---

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import Store, { useStore } from 'back-store';
const Root = () => {
  return (
    <Store value={{ count: 0 }}>
      <App />
    </Store>
  );
};

const App = () => {
  const [store, setStore] = useStore(); // getting global state
  const { count } = store;
  const plusOne = () => setStore({ count: count + 1 }); // setting global state, just like setState
  const minusOne = () => setStore(({ count }) => ({ count: count - 1 })); // supporting functions
  return (
    <>
      <h2>{count}</h2>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
    </>
  );
};

export default Root;
```
