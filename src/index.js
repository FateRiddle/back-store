import React, { useContext, useReducer, createContext } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';

const clone = value => JSON.parse(JSON.stringify(value));

const useSet = initState => {
  const reducer = (state, action) => {
    return { ...state, ...action };
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

const Global = createContext([]); // store

const Store = ({ value, children }) => {
  const statePair = useSet(value); // [store, setStore]
  return <Global.Provider value={statePair}>{children}</Global.Provider>;
};

export const useGlobal = path => {
  const [store, setStore] = useContext(Global);

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
