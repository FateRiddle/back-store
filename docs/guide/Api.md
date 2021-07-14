---
order: 3
title: Api
nav:
  order: 1
  title: guide
---

## Api

### Store

props: value, debug

| name     | description                                       | type      | 默认值 |
| -------- | ------------------------------------------------- | --------- | ------ |
| mapping  | schema 与组件的映射关系表，当内置的表不满足时使用 | `object`  | {}     |
| debug    | whether to show debug information                 | `boolean` | 1      |
| disabled | 禁用模式，全部表单元素禁用                        | `boolean` | false  |

the context provider, you need to wrap this around your root component

```js
import Store from 'back-store';

<Store value={{ user: { profile: { name: 'Adam', age: 28 } } }} debug={true}>
  <Root />
</Store>;
```

### useStore

params: path or `undefined`

```js
import { useStore } from 'back-store';

// top level
const [store, setStore] = useStore();
// 1 level deep
const [store2, setStore2] = useStore('user');
// 2 levels deep
const [store3, setStore3] = useStore('user.profile');
```

### setStore

There are different ways to set `setStore`, for max flexibility

```js
// simple
setStore({ count: 2 });
// function
setStore(({ count }) => ({ count + 1 }));
// path setting
setStore('a.b.c', Math.random());
```
