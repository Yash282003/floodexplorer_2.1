import React from "react";
import "./Map.css";
import { useEffect, useContext } from "react";
import * as L from "leaflet";
import dataContext from "../../context/datacontext";
import "leaflet/dist/leaflet.css";
import { replaceQuotes } from "../../utils/utils";
const Map = () => {
  const { sidebarOpen } = useContext(dataContext);
  const { floodData, setFloodData } = useContext(dataContext);
  const { modelArrays, setModelArrays } = useContext(dataContext);
  const { center, setCenter } = useContext(dataContext);

  useEffect(() => {
    var map1 = L.DomUtil.get("map");
    if (map1 != null) {
      map1._leaflet_id = null;
    }
    var map = L.map("map", {
      dragging: true,
    }).setView(center ? center : [22.9074872, 79.07306671], 5);
    map.dragging.enable();
    var googleHybrid = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 10,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    ).addTo(map);

    modelArrays?.forEach((e) => {
      var reversedCoordinates = JSON.parse(e)[0].map(function (coord) {
        console.log(coord);
        if (coord[0] > coord[1]) {
          return [coord[1], coord[0]];
        } else {
          return [coord[0], coord[1]];
        }
      });
      var polygon = L.polygon(reversedCoordinates, { color: "red" }).addTo(map);
      console.log(JSON.parse(e)[0]);
      console.log(reversedCoordinates);
    });
    floodData?.forEach((e) => {
      const someData = e?.flooddata[0]?.complete_geojson_geometry
        ? JSON.parse(replaceQuotes(e?.flooddata[0]?.complete_geojson_geometry))
        : {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Polygon",
                  coordinates: [
                    [
                      [84.1898, 24.6099],
                      [86.1898, 24.6099],
                      [86.1898, 26.6099],
                      [84.1898, 26.6099],
                      [84.1898, 24.6099],
                    ],
                  ],
                },
              },
            ],
          };
      L.geoJSON(someData).addTo(map);
    });
  }, [modelArrays, floodData, center]);
  return (
    <div
      style={{
        display: "block",
        zIndex: -1000,
        overflow: "hidden",
        width: sidebarOpen ? "74.2vw" : "100vw",
        position: "absolute",
        right: "0",
      }}
      className="map"
      id="map"
    ></div>
  );
};

export default Map;