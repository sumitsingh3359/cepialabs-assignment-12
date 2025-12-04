import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './features/users/userSlice';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const handleReload = () => {
    dispatch(fetchUsers());
  };

  let content;

  if (userStatus === 'loading') {
    content = (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  } else if (userStatus === 'succeeded') {
    content = (
      <div className="user-list">
        <h2>Total Users: {users.length}</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (userStatus === 'failed') {
    content = <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>User Directory</h1>
      <button onClick={handleReload}>Reload Users</button>
      {content}
    </div>
  );
}

export default App;