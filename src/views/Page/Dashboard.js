import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Population from "../Component/Population";
import { useFetchInfoQuery, useFetchPredictionMutation , useFetchFcsMutation, useFetchNdviQuery} from "../../store";
import { setFcs, setIncomeGroup, setNdvi, setPopulation, setRcsi, setRainfall } from "../../store/slice/payloadSlice";
import PieChart from "../Graphs/PieChart";

function Dashboard({ country, iso3 }) {
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.payload);
  const { data, error, isLoading } = useFetchInfoQuery();
  const [fetchPrediction, { data: predictionData, error: predictionError, isLoading: predictionIsLoading }] = useFetchPredictionMutation();
  const [fetchFcs, { data: fcsData, error: fcsError, isLoading: fcsIsLoading }] = useFetchFcsMutation();
  const { data: ndviData, error: ndviError, isLoading: ndviIsLoading } = useFetchNdviQuery();
  let info;

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
  if (isLoading) {
    info = <h4>Info: Loading...</h4>;
  } else if (error) {
    info = <h4>Total Population Count: Not Found</h4>;
  } else {
    const result = data?.countries?.filter((x) => x.country.iso3 === iso3);
    if (result && result.length > 0 && result[0].malnutrition) {
      const { acute_percent, chronic_percent } = result[0].malnutrition;
      const res = [
        { id: "Acute", value: acute_percent },
        { id: "Chronic", value: chronic_percent },
      ];
      info = <PieChart data={res} />;
      const ndviResult = ndviData?.countries?.find((x) => x.country.iso3 === iso3);
      dispatchData(result, ndviResult);
    }
  }

  useEffect(() => {
    if (country) {
      fetchFcs(iso3);
    }
  }, [country]);

  useEffect(() => {
    if (predictionData) {
      console.log(predictionData[0]);
    }
  }, [predictionData]);

  const handlePrediction = () => {
    fetchPrediction(payload)
  }
  
  return (
    <div className="board__container">
      <h3 className="title__primary">{country || "Dashboard"}</h3>
      <button type="button" onClick={handlePrediction}>Predict</button>
      <div className="board__population">
        <Population country={iso3} />
      </div>
      <div className="board__graph">
        <h3>Malnutrition Stats</h3>
        {info}
      </div>
    </div>
  );
}

export default Dashboard;