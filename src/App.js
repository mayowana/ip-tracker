import React, { useState } from "react";
import styles from "./App.module.scss";
import { AiOutlineRight } from "react-icons/ai";
import axios from "axios";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

function App() {
  const [query, setQuery] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [ip, setIp] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [isp, setIsp] = useState("");

  const position = [lat, lng];

  const searchHandle = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://geo.ipify.org/api/v1?apiKey=at_a031KBVIRYUJrPrlFqkh1m88bYqG8&ip=${query}`
      )
      .then(
        (response) => {
          setLat(response.data.location.lat);
          setLng(response.data.location.lng);
          setIp(response.data.ip);
          setCity(response.data.location.city);
          setZone(response.data.location.timezone);
          setIsp(response.data.isp);
        },
        (error) => alert(error)
      );
  };
  return (
    <>
      <div>
        <div className={styles.header}>
          <h1>IP Address Tracker</h1>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <AiOutlineRight className={styles.icon} onClick={searchHandle} />
          </div>
        </div>
        <div className={styles.maincard}>
          <div className={styles.cardbox}>
            <p className={styles.cardname}>IP ADDRESS</p>
            <p className={styles.cardbody}>{ip}</p>
          </div>

          <div className={styles.border}></div>

          <div className={styles.cardbox}>
            <p className={styles.cardname}>LOCATION</p>
            <p className={styles.cardbody}>{city}</p>
          </div>

          <div className={styles.border}></div>

          <div className={styles.cardbox}>
            <p className={styles.cardname}>TIMEZONE</p>
            <p className={styles.cardbody}>{zone}</p>
          </div>

          <div className={styles.border}></div>

          <div className={styles.cardbox}>
            <p className={styles.cardname}>ISP</p>
            <p className={styles.cardbody}>{isp}</p>
          </div>
        </div>
       
          {lat === 0 ? <p></p> : <Map
            center={position}
            zoom={15}
            style={{ width: "100%", height: "70vh", zIndex: "1"}}
          >
            <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>Na where you dey be this oh.</Popup>
    </Marker>
          </Map>}
    
      </div>
    </>
  );
}

export default App;

{
  /* setLat(response.location.lat);
        setLng(response.data.location.lng);
        setIp(response.data.ip);
        setCity(response.data.location.city);
        setZone(response.data.location.timezone);
setIsp(response.data.isp); */
}
