---
hero:
  title: use-global
  desc: Minimalist state management tools only for React.js
  actions:
    - text: Getting Started
      link: /guide
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: Progressive Adoption
    desc: a few lines of code & it's set for any React project
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: Minimalist Api
    desc: no boilerplate code, intuitive api
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: Extremely Reusable
    desc: reusing components in another project without refactoring
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

```jsx
import React from 'react';
import Global, { useGlobal } from '@gura/use-global';
const Root = () => {
  return (
    <Global value={{ count: 0 }}>
      <App />
    </Global>
  );
};

const App = () => {
  const [store, setStore] = useGlobal(); // getting global state from store
  const { count } = store;
  const plusOne = () => setStore({ count: count + 1 }); // just like setState
  const minusOne = () => setStore({ count: count - 1 });
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
