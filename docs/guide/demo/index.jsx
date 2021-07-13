import React from 'react';
import Store from 'back-store';
import Page1 from './page1';

const initialState = {
  page1: { count: 10 },
  page2: { a: { b: { text: 'hello' } } },
};

const Root = () => {
  return (
    <Store value={initialState}>
      <Page1 />
    </Store>
  );
};

export default Root;
