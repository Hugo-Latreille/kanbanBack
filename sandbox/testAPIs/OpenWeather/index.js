const APIKey = "6e6eb68e30cdac8bf3cea8dd8475ec53";

const geoCoding = async () => {
	try {
		const search = document.querySelector(".search");
		search.addEventListener("submit", handleSubmit);
	} catch (error) {
		console.error(error);
	}
};

const handleSubmit = async (e) => {
	e.preventDefault();
	const cityName = e.target[0].value;
	const response = await fetch(
		`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},FR&limit=5&appid=${APIKey}`
	);
	if (!response.ok) {
		throw new Error(`Erreur ${response.status}`);
	}
	const location = await response.json();
	const lat = location[0].lat;
	const lon = location[0].lon;
	const weatherResponse = await fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric&lang=fr`
	);
	if (!weatherResponse.ok) {
		throw new Error(`Erreur ${response.status}`);
	}
	const weatherData = await weatherResponse.json();
	console.log(weatherData);

	const meteo = document.getElementById("meteo");
	meteo.innerText = "";

	const meteoLi = document.createElement("li");
	meteoLi.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png" alt="">`;
	meteo.appendChild(meteoLi);
	const descLi = document.createElement("li");
	descLi.innerText = weatherData.current.weather[0].description;
	meteo.appendChild(descLi);
	const tempLi = document.createElement("li");
	tempLi.innerText = Math.round(weatherData.current.temp) + " degrés";
	meteo.appendChild(tempLi);
};

// const weather = async () => {
// 	try {
// 		const location = await geoCoding();
// 		const lat = location[0].lat;
// 		const lon = location[0].lon;

// 		const response = await fetch(
// 			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric&lang=fr`
// 		);
// 		if (!response.ok) {
// 			throw new Error(`Erreur ${response.status}`);
// 		}
// 		const data = await response.json();

// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// weather("Vannes");
geoCoding();
