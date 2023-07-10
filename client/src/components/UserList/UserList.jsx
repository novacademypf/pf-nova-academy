import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/actions/userActions';


const UserList = ({ users }) => {
  const dispatch = useDispatch();

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  if(users === 0) {
    return <h2>No existen usuarios registrados por el momento</h2>
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
