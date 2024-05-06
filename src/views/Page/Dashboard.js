import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useFetchInfoQuery, useFetchPredictionMutation , useFetchFcsMutation, useFetchNdviQuery, useFetchPlotMutation} from "../../store";
import { setFcs, setIncomeGroup, setNdvi, setPopulation, setRcsi, setRainfall } from "../../store/slice/payloadSlice";
import Board from "../Component/Board";


function Dashboard({ country, iso3 }) {
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.payload);
  const header = useSelector((state) => state.header.id);
  const { data, error, isLoading } = useFetchInfoQuery();
  const [fetchPrediction, { data: predictionData, error: predictionError, isLoading: predictionIsLoading }] = useFetchPredictionMutation();
  const [fetchFcs, { data: fcsData, error: fcsError, isLoading: fcsIsLoading }] = useFetchFcsMutation();
  const { data: ndviData, error: ndviError, isLoading: ndviIsLoading } = useFetchNdviQuery();


  const allDataLoaded = !isLoading && !predictionIsLoading && !fcsIsLoading && !ndviIsLoading;

  const dispatchData = (result, ndviResult) => {
    const ndviPeopleDry = ndviResult?.dataPoints[0]?.ndvi?.peopleDry || 0;
    const rainfallPeopleDry = ndviResult?.dataPoints[0]?.rainfall?.peopleDry || 0;
    const populationNumber = result[0]?.population?.number || 0;
    const incomeGroupLevel = result[0]?.income_group?.level || 0;
    const fcsPeople = fcsData?.metrics?.fcs?.people || 0;
    const rcsiPeople = fcsData?.metrics?.rcsi?.people || 0;
    
    dispatch(setPopulation(populationNumber));
    dispatch(setIncomeGroup(incomeGroupLevel));
    dispatch(setFcs(fcsPeople));
    dispatch(setRcsi(rcsiPeople));
    dispatch(setNdvi(ndviPeopleDry));
    dispatch(setRainfall(rainfallPeopleDry));

  }

  useEffect(() => {
    if (data && ndviData) {
      const result = data?.countries?.filter((x) => x.country.iso3 === iso3);
      if (result && result.length > 0 && result[0].malnutrition) {
        const ndviResult = ndviData?.countries?.find((x) => x.country.iso3 === iso3);
        dispatchData(result, ndviResult);
      }
    }
  }, [data, ndviData, iso3, dispatchData]);

  useEffect(() => {
    if (country) {
      fetchFcs(iso3);
    }
  }, [country]);

useEffect(() => {
      if(payload.population > 0){
        fetchPrediction(payload);
      }
}, [payload]);



  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Board 
        country={country} 
        payload={payload} 
        predictionData={predictionData}
        dataLoading={predictionIsLoading}
        allDataLoaded={allDataLoaded}
      />
    </div>
);
}

export default Dashboard;