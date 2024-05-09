import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import { useSelector } from "react-redux";
import { useFetchIPCQuery } from "../../store";
import { africa_shape } from "../Graphs/africa";

import "leaflet/dist/leaflet.css";

const position = [1.9422957087636317, -27.91002939455943];

function Map({ onClick }) {
  const [activePolygon, setActivePolygon] = useState(["NER", "#F09536"]);
  const { data, error, isLoading } = useFetchIPCQuery();
  const header = useSelector((state) => state.header.id);

  const handleColor = (poly) => {
    if (!data) return "rgb(24,140,179)";

    if (header === 0) {
      return activePolygon[0] === poly ? activePolygon[1] : "rgb(24,140,179)";
    } else {
      const peak = data.ipc_peaks.find((peak) => peak.iso3 === poly);
      if (!peak) return "rgb(24,140,179)";

      const percent = peak.phase_3_percent;
      if (percent === 0) return "#22c1c3";
      else if (percent <= 1) return "#f9bc30";
      else if (percent > 1) return "#dd0a43";
    }

    return "rgb(24,140,179)";
  };

  const handleClick = (admin,iso_a3) => {
    onClick(admin,iso_a3);
    setActivePolygon([iso_a3, "#F09536"]);
  };

  const handleZoom = () => {
    const screenWidth = window.innerWidth;
    return screenWidth <= 768; // Tablet or smaller screens
  };

  return (
    <section className="map__container">
   {header === 2 || header === 3 ? (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#000', 
        color: '#fff', 
        fontSize: '2em' 
      }}>
        <h1>Future Enhancement</h1>
      </div>
    ) : (
      <MapContainer
        dragging={false}
        center={position}
        zoom={handleZoom() ? 2 : 3}
        className="map"
        scrollWheelZoom={true}
        zoomControl={false}
      >
        //Canvas layer leaflet
        <TileLayer
          url="https://api.mapbox.com/styles/v1/shagar49/clifkgrew003301qp62i773my/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2hhZ2FyNDkiLCJhIjoiY2xpZmI2ZjJiMGRzdzNrc2U1NGp3YmJiYSJ9.Egq0DyLMnUGTOgJyiqvZSw"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {africa_shape.features.map((country) => {
          const coordinates = country.geometry.coordinates[0].map((item) => [
            item[1],
            item[0],
          ]);
          const { iso_a3, admin } = country.properties;
          const fillColor = handleColor(iso_a3);

          return (
            <Polygon
              key={iso_a3}
              pathOptions={{
                fillColor,
                fillOpacity: 0.7,
                weight: 1,
                opacity: 1,
                dashArray: 0,
                color: "black",
              }}
              positions={coordinates}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 5,
                    weight: 1,
                    dashArray: 0,
                    color: "black",
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.7,
                    weight: 1,
                    dashArray: 0,
                    color: "black",
                  });
                },
                click: () => handleClick(admin,iso_a3),
                zoom: () => console.log("heyy")
              }}
            >
              <Tooltip
                sticky={true}
                className="map__tooltip"
                direction="top"
                offset={[1, 1]}
              >
                {admin}
              </Tooltip>
            </Polygon>
          );
        })}
      </MapContainer>)}
    </section>
  );
}

export default Map;
