import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlaceList } from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';

export const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userID = useParams().userID;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userID}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userID]);

  const placeDeletedHandler = (deletePlaceID) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletePlaceID))
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlaces={placeDeletedHandler} />}
    </React.Fragment>
  );
};
