import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  state = {
    city: null,
    lat: "53",
    lon: "50",
    data: {timezone:"Europe/Samara"},
    maxPressure: "нет данных",
    maxDiff: "нет данных",
  };

  async componentDidMount() {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&lang=ru&appid=6ba3a2f78b90ca9f7b9f414c026b2e2d`;
    //https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=6ba3a2f78b90ca9f7b9f414c026b2e2d
    const response = await this.request(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.setState({
        data: data,
      });
      const pressure = [
        this.state.data.daily[0].pressure,
        this.state.data.daily[1].pressure,
        this.state.data.daily[2].pressure,
        this.state.data.daily[3].pressure,
        this.state.data.daily[4].pressure,
      ];
      const maxPressure = Math.max.apply(null, pressure);
      this.setState({
        maxPressure: maxPressure,
      });
      const temp = [
        +(
          this.state.data.daily[0].temp.night -
          this.state.data.daily[0].temp.morn
        ),
        +(
          this.state.data.daily[1].temp.night -
          this.state.data.daily[1].temp.morn
        ),
        +(
          this.state.data.daily[2].temp.night -
          this.state.data.daily[2].temp.morn
        ),
        +(
          this.state.data.daily[3].temp.night -
          this.state.data.daily[3].temp.morn
        ),
        +(
          this.state.data.daily[4].temp.night -
          this.state.data.daily[4].temp.morn
        ),
      ];
      const maxDiff = Math.max.apply(null, temp).toFixed(2);
      this.setState({
        maxDiff: maxDiff,
      });
    }
  }

  request = (url) => {
    return fetch(url);
  };

  setLat = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      lat: event.target.value,
    }));
  };
  setLon = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      lon: event.target.value,
    }));
  };
  setSity = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      city: event.target.value,
    }));
  };
  getWeather = (event) => {
    event.preventDefault();
   
    this.componentDidMount();
  };
  render() {
    return (
      <div className="App">
        <form>
          <input
            type="text"
            onChange={this.setLat}
            placeholder="Введите широту"
          ></input>
          <input
            type="submit"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          ></input>
        </form>
        <form>
          <input
            type="text"
            name="city"
            onChange={this.setLon}
            placeholder="Введите долготу"
          ></input>
          <input
            type="submit"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          ></input>
        </form>
        
        <input
          onClick={this.getWeather}
          type="submit"
          value="Рассчитать погоду"
        ></input>
        <h2>{`Город - ${this.state.data.timezone}`}</h2>
        <div>{`Наибольшее давление за 5 дней - ${this.state.maxPressure} кПа`}</div>
        <div>{`Наибольшая разница температур за 5 дней - ${this.state.maxDiff} \u2103`}</div>
      </div>
    );
  }
}

export default App;
