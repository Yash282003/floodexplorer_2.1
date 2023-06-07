import React from 'react'
import './Map.css'
import { useEffect, useContext } from 'react'
import * as L from "leaflet";
import dataContext from '../../context/datacontext';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    const { sidebarOpen } = useContext(dataContext);
    const { floodData, setFloodData } = useContext(dataContext);
    const { modelArrays,setModelArrays } = useContext(dataContext);

//   const { isSideBarOpen, setIsSideBarOpen } = useContext(dataContext)

  const style2 = {
    display: 'block'
  }

  useEffect(() => {
    var map1 = L.DomUtil.get('map'); if (map1 != null) { map1._leaflet_id = null; }


    // if(address.items!=undefined){
    //   var southWest = L.latLng(address.items[0].mapView.south,address.items[0].mapView.west)
    //   var northEast = L.latLng(address.items[0].mapView.north,address.items[0].mapView.east)
    //   var bounds = L.latLngBounds(southWest, northEast);
    // }else{

    //   var southWest = L.latLng(29.83900608249045,77.90231862375538)
    //   var northEast = L.latLng(29.88188113949949,77.95107045481006)
    //   var bounds = L.latLngBounds(southWest, northEast);
    // }
    var map = L.map('map', {
      //maxBounds: bounds,   // Then add it here..


    }).setView([22.9074872, 79.07306671], 5);
    var googleHybrid = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);
    // var marker = new L.Marker([17.385044, 78.486671]).addTo(map)
    // L.marker([50.5, 30.5]).addTo(map);
    var latlngs = [
      [29.83900608249045, 77.90231862375538],
      [29.83900608249045, 77.95107045481006],
      [29.88188113949949, 77.95107045481006],
      [29.88188113949949, 77.90231862375538],
      [29.83900608249045, 77.90231862375538],

    ];
    
       modelArrays?.forEach((e)=>{
         var reversedCoordinates = JSON.parse(e)[0].map(function(coord) {
           return [coord[1], coord[0]];
         });
      var polygon = L.polygon(reversedCoordinates, { color: 'red' }).addTo(map);
      console.log(JSON.parse(e)[0])
      console.log(reversedCoordinates)
      })
    floodData?.forEach((e) => {
      const someData = e?.flooddata[0]?.complete_geojson_geometry ? JSON.parse(replaceQuotes(e?.flooddata[0]?.complete_geojson_geometry)) : 
      { 'type': 'FeatureCollection', 'features': [{ 'type': 'Feature', 'properties': {}, 'geometry': { 'type': 'Polygon', 'coordinates':
       [[[84.1898, 24.6099], [86.1898, 24.6099], [86.1898, 26.6099], [84.1898, 26.6099], [84.1898, 24.6099]]] } }] }
      L.geoJSON(someData).addTo(map);
    })

    function replaceQuotes(str) {
      var replacedStr = str.replace(/['"]/g, function (match) {
        if (match === '"') {  
          return "'";
        } else {
          return '"';
        }
      });

      return replacedStr;
    }






    // polyline.addTo(map);
    // osm.addTo(map);

    var myStyle = {
      "color": "red",
      "weight": 3,
      "opacity": 1
    };
    var defaultStyle = {
      "color": "lightblue",
      "weight": "2"
    }



  }, [modelArrays,floodData])
  return (
    <div
      style={{ display: 'block', zIndex:-1000,overflow: 'hidden', width: sidebarOpen ? "74.2vw" : "100vw", position: 'absolute', right: '0' }}
      className='map' id="map">

    </div>
  )
}

export default Map