import React, { Component } from "react";
import "./styles.css";

class About extends Component {
  state = {
    // Your required states here
    zipcode: "",
    firstName: "Aziz"
  };
  // Component did mount great if you want to get data before, but otherwise you can just make API call

  handleChange = (event) => {
    this.setState({ zipcode: Number(event.target.value) });
    console.log("Your zip code is " + this.state.zipcode);
  };

  handleSubmit = (event) => {
    // Your fetch here
    // Your state updates go under function(json)
    // Need to prevent refresh of state so do preventDefault
    // Need to do preventdefault to prevent refresh for forms
    event.preventDefault();
    this.getWeatherForZipcode();
  };
  // navigator.geolocation.getCurrentPosition((e)=> console.log(e) )
  getWeatherForZipcode = () => {
    fetch(
      // Made me do https
      `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&appid=052f26926ae9784c2d677ca7bc5dec98`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          weather_for_zipcode: json
        });
        // console.log(json);
        console.log(this.state);
      })
      .catch(function (ex) {
        console.log("An error occurred while parsing!", ex);
      });
  };

  convert = (kelvin) => {
    return ((kelvin - 273.15) / 5 + 32).toFixed(1);
  };

  render() {
    const weather = this.state.weather_for_zipcode;
    let message;
    if (!weather) {
      message = "";
    } else {
      message = `${weather.name}: currently ${weather.weather[0].description}
      with a high of ${this.convert(
        weather.main.temp_max
      )} degrees and a low of ${this.convert(weather.main.temp_min)} degrees`;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>{message}</p>
          <label>
            Please enter your zip code for the weather:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input
            type="submit"
            value="Get my forecast!"
            onClick={this.getWeatherForZipcode}
          />
        </form>
      </div>
    );
  }
}

export default About;
