import React from 'react';
import Store from 'back-store';

const initialState = {
  inputVal: '',
  todoList: [],
};

const Root = () => {
  return (
    <Store value={initialState}>
      <Page1 />
    </Store>
  );
};

export default Root;
