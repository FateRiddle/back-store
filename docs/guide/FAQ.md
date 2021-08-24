---
order: 4
title: FAQ
nav:
  order: 1
  title: guide
---

## FAQ

1. How to get access to a specific level of global state?

```js
// top level
const [store, setStore] = useStore();
// 1 level deep
const [store2, setStore2] = useStore("user");
// 2 levels deep
const [store3, setStore3] = useStore("user.profile");
```

2. Sometimes I only need to update states, how to only use `setStore`?

```js
const [, setStore] = useStore();
```

3. The project seems barebone, is it just a toy for simple demos?

No. See motivation part of the doc for why we design it this way and why it's enough. Simply put, we don't believe state management should be so complex in the first place. And we've got plenty real-world projects powered by `back-store` released, so far all good.
