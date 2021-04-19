import React, { useContext, useReducer, createContext } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';

const clone = value => JSON.parse(JSON.stringify(value));

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
  const setStateWithPath = (path, value) => {
    let copy = clone(state);
    const newState = set(copy, path, value);
    setState(newState);
  };

  let path;

  const _setState = (firstArg, ...rest) => {
    if (firstArg && typeof firstArg === 'string') {
      let _path = firstArg;
      if (path && typeof path === 'string') {
        _path = path + '.' + firstArg;
      }
      setStateWithPath(_path, ...rest);
    } else {
      if (path && typeof path === 'string') {
        setStateWithPath(path, firstArg);
      }
      setState(firstArg);
    }
  };
  return [state, _setState];
};

const globalContext = {};

globalContext.STORE = createContext();
globalContext.SET = createContext();

const Store = ({ value, children }) => {
  const [store, setStore] = useSet(value);
  const Ctx1 = globalContext.STORE;
  const Ctx2 = globalContext.SET;
  return (
    <Ctx1.Provider value={store}>
      <Ctx2.Provider value={setStore}>{children}</Ctx2.Provider>
    </Ctx1.Provider>
  );
};

export const useGlobal = path => {
  const store = useContext(globalContext.STORE);
  const setStore = useContext(globalContext.SET);

  const setStateWithPath = (path, value) => {
    let copy = clone(store);
    const newState = set(copy, path, value);
    setStore(newState);
  };

  let _store = store;
  if (path && typeof path === 'string') {
    _store = get(store, path);
  }

  const _setStore = (firstArg, ...rest) => {
    if (firstArg && typeof firstArg === 'string') {
      let _path = firstArg;
      if (path && typeof path === 'string') {
        _path = path + '.' + firstArg;
      }
      setStateWithPath(_path, ...rest);
    } else {
      if (path && typeof path === 'string') {
        setStateWithPath(path, firstArg);
      }
      setStore(firstArg);
    }
  };
  return [_store, _setStore];
};

export default Store;
