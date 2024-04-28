import React from "react";
import { setIpc, useFetchIPCQuery } from "../../store";
import { useDispatch } from "react-redux";

function Population({ country }) {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchIPCQuery();
  let population;

  if (isLoading) {
    population = <h4>Total Population Count : Loading ...</h4>;
  } else if (error) {
    population = <h4>Total Population Count : Not Found</h4>;
  } else {
    const result = data.ipc_peaks.filter((x) => x.iso3 == country);
    if (result.length > 0) {
        const ipcValue = result[0].phase_3_percent !== undefined ? result[0].phase_3_percent : 0;
        dispatch(setIpc(ipcValue));
        const populationCount = (result[0].analyzed_population_number / 1000000).toFixed(2) + "M";
        population = (
            <>
                <h4>Total Population Count : {populationCount}</h4>
            </>
        );
    } else {
        dispatch(setIpc(0));
        population = (
            <>
                <h4>Total Population Count : N/A</h4>
            </>
        );
    }
}
  return <>{population}</>;
}

export default Population;
