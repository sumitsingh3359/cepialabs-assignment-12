import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './store/counterSlice';
import { fetchUsers } from './store/userSlice';
import './App.css';

function App() {
  const count = useSelector((state) => state.counter.count);
  const users = useSelector((state) => state.users.list);
  const userStatus = useSelector((state) => state.users.status);
  const userError = useSelector((state) => state.users.error);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleReloadUsers = () => {
    dispatch(fetchUsers());
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
        </a>
      </div>
      <h1>Redux Toolkit Counter & User Fetcher</h1>

      <div className="card">
        <h2>Counter: {count}</h2>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <br />
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
          Add by Amount
        </button>
      </div>

      <div className="card">
        <h2>Total Users: {users.length}</h2>
        <button onClick={handleReloadUsers}>Reload Users</button>
        {userStatus === 'loading' && <p>Loading users...</p>}
        {userStatus === 'failed' && <p>Error: {userError}</p>}
        {userStatus === 'succeeded' && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;