import { useStore } from 'back-store';

const Page1 = () => {
  const [store, setStore] = useStore('page1'); // getting Store state from store
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

export default Page1;
