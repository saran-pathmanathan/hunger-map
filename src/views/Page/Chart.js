import React, { useState } from "react";
import Population from "../Component/Population";
import { useFetchInfoQuery } from "../../store";
import PieChart from "../Graphs/PieChart";

function Dashboard({ country }) {
  const { data, error, isLoading } = useFetchInfoQuery();

  let info;

  if (isLoading) {
    info = <h4>Info: Loading...</h4>;
  } else if (error) {
    info = <h4>Total Population Count: Not Found</h4>;
  } else {
    const result = data?.countries?.filter((x) => x.country.name === country);
    if (result && result.length > 0 && result[0].malnutrition) {
      const { acute_percent, chronic_percent } = result[0].malnutrition;
      const res = [
        { id: "Acute", value: acute_percent },
        { id: "Chronic", value: chronic_percent },
      ];
      info = <PieChart data={res} />;
    }
  }

  return (
    <div className="board__container">
      <h3 className="title__primary">{country || "Dashboard"}</h3>
      <div className="board__graph">
        <h3>Malnutrition Stats</h3>
        {info}
      </div>
    </div>
  );
}

export default Dashboard;
