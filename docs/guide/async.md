---
order: 2
title: Handling async code
nav:
  order: 1
  title: guide
---

## Handling async code

When you look into a state management tool, the first thing beyond "hello world" demo you could pay attention to, is how it handles async code.

Most state management tools tend to keep state change "pure", in other words, async code has to be stripped out of its "core loop", in redux's case, reducers. While this decision enables cool features like time travel, it creates its own problem by reinvent how to write async code alltogether. Libraries like `redux-saga` completely alter the way we write async code, making refactoring into/out of a redux project costly, and also steepen the learning curve for newcomers.

Back-store doesn't reinvent anything, in fact, all you need to know is how to use `setState`/`useState` and promise/async-await. The way you write your code after adopting back-store is perfectly unchanged:

For instance, this is your normal react code:

```js
import React, { useState } from 'react';

const Demo = () => {
  const [store, setStore] = useState({ text: 'hello' });

  const changeTextAsync = () => {
    fakeApiCalls().then(res => setStore({ text: 'world' });
  }

  return (
    <div>
      <p>{store.text}</p>
      <button onClick={changeTextAsync}>click me</button>
    </div>
  );
};
```

And this is what it looks like after using `back-store`:

```js
import React from 'react';
import { useStore } from 'back-store';

const Demo = () => {
  const [store, setStore] = useStore(); // getting state from global store instead of local

  const changeTextAsync = () => {
    fakeApiCalls().then(res => setStore({ text: 'world' });
  }

  return (
    <div>
      <p>{store.text}</p>
      <button onClick={changeTextAsync}>click me</button>
    </div>
  );
};
```

We see the only change made here, is intead of getting/setting state form local `useState`, we get/set it from a global store by `useStore`
