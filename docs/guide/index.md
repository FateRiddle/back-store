---
order: 1
title: getting started
nav:
  order: 1
  title: guide
---

```jsx
import React from 'react';
import Global, { useGlobal } from '@ali/use-global';

const Wrapper = ({ children }) => <div>{children}</div>;

const Root = () => {
  return (
    <Global value={{ count: 1 }}>
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
  const [store, setStore] = useGlobal(); // getting global state from store
  const { count } = store;

  const plusOne = () => setStore('count', count + 1);
  const minusOne = () => setStore({ count: count - 1 });
  const setRandom = () => setStore('a.b.c', Math.random());

  return (
    <div>
      <div>{JSON.stringify(store)}</div>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
      <button onClick={setRandom}>a.b.c</button>
    </div>
  );
};

export default Root;
```

## Motivation

I never really think redux is bad for coding up a project, but if you have to make a small change to existing redux project writing by others, that's another story. What I find most state management tools have in common are traits below (using redux in explanation for simplicity):

1. Redundent layer of abstruction. We get used to this "dispatch action" model, but so often I find myself dispatching an action `showModal`, just to set a state called `showModal` from `false` to `true`. React state is usually enough of abstruction, we don't need another layer of abstruction on top of that.

2. Re-learn how to write async code. If you ever use redux for real project, you need to re-learn how to write async code and pick up another library no less, all because redux needs it's reducer to be synchronize.

3. Hardly reusable. It's always easy to reuse a pure component, but so often we want to reuse something with state & logic. If you're trying to reuse a page written in redux in another pure react app, good luck with that. Either you turn your app into redux project or you painfully refactoring all the redux

And

## Install

```sh
tnpm i -S @ali/use-global
```

## Usage

### Step 1

- declare your global state structure, in a context-like api (Yes it's just a React context provider).
- wrapping your `<App />` inside the context provider `Global`

```js
import React from 'react';
import Global from '@ali/use-global';

const initialState = {
  page1: { count: 1 },
  page2: { a: { b: { text: 'hello' } } },
};

const Root = () => {
  return (
    <Global value={initialState}>
      <App />
    </Global>
  );
};
```

### Step 2

Profit (anywhere! )

```js
// Anywhere inside <App />
import { useGlobal } from '@ali/use-global';
const Counter = () => {
  const [store, setStore] = useGlobal('page1'); // getting global state from store
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

## FAQ

1. How to get access to the very top level of global store?

```js
const [store, setStore] = useGlobal();
```

2. How to only using `setStore`?

```js
const [_, setStore] = useGlobal('xxx');
```

3. How to

## Features

1. `lodash.set` like syntax for deep structures

```js
// Anywhere inside <App />
import { useGlobal } from '@ali/use-global';
const Something = () => {
  const [store, setStore] = useGlobal('page2');
  const changeText = () => setStore('a.b.text', 'hello world!');
  return (
    <div>
      <p>{store.a.b.text}</p>
      <button onClick={changeText}>click me</button>
    </div>
  );
};
```

2. You actually don't need to declare anything, and everything still works

```js
import React from 'react';
import Global from '@ali/use-global';

const Root = () => {
  return (
    <Global>
      <App />
    </Global>
  );
};
```

3. Highly reusable

To move a component accessing global state/methods to another pure react project:

```js
const Root = () => {
  return (
    <Global>
      <AnotherProject />
    </Global>
  );
};

const AnotherProject = () => (
  <div>
    <ReusableComponent />
  </div>
);
```

4. Writing async code just like pure React, no need to learn another way (looking at other state management tools):

```js
// Anywhere inside <App />
import { useGlobal } from '@ali/use-global';
const Something = () => {
  const [store, setStore] = useGlobal('page2');
  const changeTextAsync = () => {
    apiCalls().then(res => setStore('a.b.text', res);)
  }
  return (
    <div>
      <p>{store.a.b.text}</p>
      <button onClick={changeText}>click me</button>
    </div>
  );
};
```

```jsx
import React from 'react';
import Global, { useGlobal } from '@ali/use-global';

const Wrapper = ({ children }) => <div>{children}</div>;

const Root = () => {
  return (
    <Global value={{ count: 1 }}>
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
  const [store, setStore] = useGlobal(); // getting global state from store
  const { count } = store;

  const plusOne = () => setStore({ count: count + 1 });

  const minusOne = () => setStore({ count: count - 1 });
  return (
    <div>
      <div>{JSON.stringify(store)}</div>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
    </div>
  );
};

export default Root;
```

class way

```js
import React from 'react';
import Global, { useGlobal, GlobalContext } from '@ali/use-global';

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

class App extends React.Component {
  plusOne = () => {
    const [store, setStore] = this.context;
    setStore('page1.count', store.page1.count + 1);
  };

  minusOne = () => {
    const [store, setStore] = this.context;
    setStore('page1.count', store.page1.count - 1);
  };

  render() {
    const [store, setStore] = this.context;
    return (
      <div>
        <div>{store.page1.count}</div>
        <button onClick={this.plusOne}>+</button>
        <button onClick={this.minusOne}>-</button>
      </div>
    );
  }
}

App.contextType = GlobalContext;

export default Root;
```

dd
