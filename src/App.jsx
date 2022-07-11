import axios from "axios";
import { useState } from "react";
import logo from "./images/logo.png";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [waktu, setWaktu] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e299620272549d21371cc039cce719b0`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      try {
        axios.get(url).then((res) => {
          setData(res.data);
          console.log(res.data);
        });
      } catch (err) {
        console.log("Error : " + err.message);
      }
      setLocation("");
    }
  };

  setInterval(() => {
    setWaktu(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="brand-logo" />
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="time" style={{ marginLeft: "5px" }}>
            {waktu}
          </div>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed(0) - 273}°C</h1> : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">{data.main.feels_like.toFixed(0) - 273}°C</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
