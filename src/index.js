import React, { useContext, useReducer, createContext } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';

const clone = value => JSON.parse(JSON.stringify(value));

const isPath = p => p && typeof p === 'string';

const isObject = a => Object.prototype.toString.call(a).indexOf('Object') > -1;

const useSet = initState => {
  // 提供函数式调用，避免同时修改一个状态时产生的state闭包，只有最后一次调用更新的问题
  const reducer = (state, action) => {
    let result;
    if (typeof action === 'function') {
      result = { ...state, ...action(state) };
    } else {
      result = { ...state, ...action };
    }
    return result;
  };

  const [state, setState] = useReducer(reducer, initState);

  const _setState = (firstArg, ...rest) => {
    if (isPath(firstArg) && rest !== undefined) {
      setStateByPath(firstArg, ...rest);
    } else {
      setState(firstArg);
    }
  };

  const setStateByPath = (path, value) => {
    let copy = clone(state);
    const oldState = get(copy, path);
    let mergeValue = value;
    if (isObject(oldState) && isObject(value)) {
      mergeValue = { ...oldState, ...value };
    }
    const newState = set(copy, path, mergeValue);
    setState(newState);
  };

  return [state, _setState];
};

const StoreContext = {};

StoreContext.STORE = createContext();
StoreContext.SET = createContext();

const Store = ({ value, debug, children }) => {
  const [store, setStore] = useSet(value);
  const Ctx1 = StoreContext.STORE;
  const Ctx2 = StoreContext.SET;

  return (
    <>
      {debug === true ? <div>{JSON.stringify(store)}</div> : null}
      <Ctx1.Provider value={store}>
        <Ctx2.Provider value={setStore}>{children}</Ctx2.Provider>
      </Ctx1.Provider>
    </>
  );
};

export const useStore = rootPath => {
  const store = useContext(StoreContext.STORE);
  const setStore = useContext(StoreContext.SET);

  let _setStore = setStore;
  let _store = store;
  if (isPath(rootPath)) {
    _store = get(store, rootPath, {});
    _setStore = (firstArg, ...rest) => {
      if (isPath(firstArg) && rest !== undefined) {
        const realPath = rootPath + '.' + firstArg;
        setStore(realPath, ...rest);
      } else {
        setStore(rootPath, firstArg);
      }
    };
  }

  return [_store, _setStore];
};

export default Store;
