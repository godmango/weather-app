import React, { Component } from "react";
import "./App.css";
export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			wData: null,
		};
	}
	getLocation = () => {
		navigator.geolocation.getCurrentPosition((post) => {
			this.getWeather(post.coords.longitude, post.coords.latitude);
		});
	};
	getCityWeather = async (selectedCity) => {
		let apikey = process.env.REACT_APP_APIKEY;
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apikey}`;
		let response = await fetch(url);
		let data = await response.json();

		this.setState({ wData: data });
	};
	componentDidMount() {
		this.getLocation();
	}
	getWeather = async (longitude, latitude) => {
		let apikey = process.env.REACT_APP_APIKEY;

		let url;
		if (latitude) {
			url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
		} else {
			url = `https://api.openweathermap.org/data/2.5/weather?q=saigon&appid=${apikey}`;
		}
		console.log(url);
		let response = await fetch(url);
		let data = await response.json();
		console.log("data", data);
		this.setState({ wData: data });
	};
	componentDidMount() {
		this.getLocation();
	}

	render() {
		return (
			<div className="realThing">
				<div className="theWholeThing">
					{" "}
					<div className="weatherDisplay">
						<p>City: {this.state.wData && this.state.wData.name}</p>
						<p>
							Temperature:{" "}
							{this.state.wData &&
								Math.round(this.state.wData.main.temp - 273.15)}
							°C /{" "}
							{this.state.wData &&
								Math.round(
									((this.state.wData.main.temp - 273.15) * 9) / 5 + 32
								)}
							°F
						</p>
						<p>
							Humidity: {this.state.wData && this.state.wData.main.humidity}%
						</p>
						<p>{this.state.wData && this.state.wData.weather[0].description}</p>
					</div>
					<div className="cityButton">
						<button onClick={() => this.getCityWeather("Голубинка")}>
							Голубинка
						</button>
						<button onClick={() => this.getCityWeather("seoul")}>Seoul</button>
						<button onClick={() => this.getCityWeather("tokyo")}>Tokyo</button>
						<button onClick={() => this.getCityWeather("New York City")}>
							New York City
						</button>
					</div>
				</div>
			</div>
		);
	}
}
