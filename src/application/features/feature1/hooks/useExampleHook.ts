import { useEffect } from 'react';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../exampleSlice';
import { FetchExampleData } from '../services/exampleService';
import { useAppDispatch, useAppSelector } from '../../../../core/store/hooks';
import { eventService } from '../../../../core/eventHandler/eventServiceHandler';

const useExampleHook = () => {

const dispatch = useAppDispatch();

const { data, loading } = useAppSelector((state) => state.example);

  useEffect(() => {

    const fetchData = async () => {

      eventService
      .triggerRequest( new FetchExampleData())
      .onStart(() => {
          console.log("Fetching example data...");
          dispatch(fetchDataStart());
      })
      .onSuccess((response: any) => {
          console.log("Fetched example data successfully:", response);
        dispatch(fetchDataSuccess(response));
      })
      .onFailure((error:any) => {
        console.log("Fetched example data fail:", error);

        dispatch(fetchDataFailure());
      })

    };

    fetchData();
  }, [dispatch]);

  return { data, loading };
};

export default useExampleHook;
