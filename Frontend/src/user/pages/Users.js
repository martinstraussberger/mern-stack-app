import React, { useEffect, useState } from 'react';

import { UsersList } from '../components/UsersList';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from "../../shared/hooks/http-hook";

export const Users = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    // iefy --> immediately executing function
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');

        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err)
      }
    };
    fetchUsers();
    // sendRequest coming from outside the effect -- therefore dependency
  }, [sendRequest]);


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};