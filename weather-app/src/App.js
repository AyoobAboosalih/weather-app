/* eslint-disable default-case */
import React, { Component } from 'react'
import './App.css';
import Weather from './components/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css'
import Form from './components/form.component';

// api call: api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "a5138c5a612a60090bd1afc726fdf633"





class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      city: undefined,
      country: undefined,
      temp_celcius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: '',
      error: false,
      icon: undefined,
      main: undefined,
      celcius: undefined

    }

    

    this.wIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
     
    }


    
  }

  get_WIcon(icons, rangeID) {
    switch (true) {
      case rangeID >= 701 && rangeID <= 232:
        this.setState({ icon: this.wIcon.Atmosphere })
        break;

      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.wIcon.Thunderstorm })
        break;

      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.wIcon.Drizzle })
        break;

      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.wIcon.Rain})
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.wIcon.Snow })
        break;

      case rangeID === 800 :
        this.setState({ icon: this.wIcon.Clear })
        break;

        case rangeID >= 801 && rangeID <= 804:
          this.setState({ icon: this.wIcon.Clouds })
          break;

        default:
          this.setState({ icon: this.wIcon.Clouds })
    }


  }


  calCelcius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell;
  }

  getWeather = async (e) => {

    e.preventDefault()

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

   if(city && country){
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );
    const response = await api_call.json();
    console.log(response);

    this.setState({
      city: `${response.name},${response.sys.country}`,
      country: response.sys.country,
      celcius: this.calCelcius(response.main.temp),
      temp_max: this.calCelcius(response.main.temp_max),
      temp_min: this.calCelcius(response.main.temp_min),
      description: response.weather[0].description,
      error: false
    })

    this.get_WIcon(this.wIcon,response.weather[0].id);

   }else{
     this.setState({error: true})

   }
    
  }



  render() {
    return (
      <div className="App">

        <h1>
          <Form loadweather={this.getWeather} error={this.state.error}/>
          <Weather
            city={this.state.city}
            country={this.state.country}
            temp_celsius={this.state.celcius}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
            wIcon={this.state.icon} />
        </h1>
      </div>
    )
  }
}


export default App;
