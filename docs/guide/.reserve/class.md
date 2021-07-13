```js
import React from 'react';
import Store, { useStore, StoreContext } from 'back-store';

const Root = () => {
  return (
    <Store value={{ page1: { count: 1 } }}>
      <App />
    </Store>
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
    const [store] = this.context;
    return (
      <div>
        <div>{store.page1.count}</div>
        <button onClick={this.plusOne}>+</button>
        <button onClick={this.minusOne}>-</button>
      </div>
    );
  }
}

App.contextType = StoreContext;

export default Root;
```
