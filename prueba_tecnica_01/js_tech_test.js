const axios = require('axios');

class Film {
	constructor(name) {
		this.name = name;
		this.planets = [];
		this.characters = [];
		this.starships = [];
	}

	async getPlanets(planetsURLs) {
		for await (let planetURL of planetsURLs) {
			let planet_info = (await axios.get(planetURL)).data;
			const planet = new Planet(planet_info.name, planet_info.terrain, planet_info.gravity, planet_info.diameter, planet_info.population);
			this.planets.push(planet);
		}
	}

	async getCharacters(characterURLs) {
		for await (let characterURL of characterURLs) {
			let character_info = (await axios.get(characterURL)).data;

			let specie = [];

			if (character_info.species.length) {
				specie = new Specie(character_info.species.name, character_info.species.language, character_info.species.average_height);
			}

			const character = new Character(
				character_info.name,
				character_info.gender,
				character_info.hair_color,
				character_info.skin_color,
				character_info.homeworld,
				specie
			);
			this.characters.push(character);
		}
	}

	async getStarships(starshipsURLs) {
		for await (let starshipURL of starshipsURLs) {
			let starship_info = (await axios.get(starshipURL)).data;
			const starship = new Starship(starship_info.name, starship_info.model, starship_info.manufacturer, starship_info.passengers);
			this.starships.push(starship);
		}
	}
}

class Planet {
	constructor(name, terrain, gravity, diameter, population) {
		this.name = name;
		this.terrain = terrain;
		this.gravity = gravity;
		this.diameter = diameter;
		this.population = population;
	}
}

class Specie {
	constructor(name, language, average_height) {
		this.name = name;
		this.language = language;
		this.average_height = average_height;
	}
}

class Character {
	constructor(name, gender, hair_color, skin_color, eye_color, height, homeworld, specie) {
		this.name = name;
		this.gender = gender;
		this.hair_color = hair_color;
		this.skin_color = skin_color;
		this.eye_color = eye_color;
		this.height = height;
		this.homeworld = homeworld;
		this.specie = specie;
	}
}

class Starship {
	constructor(name, model, manufacturer, passengers) {
		this.name = name;
		this.model = model;
		this.manufacturer = manufacturer;
		this.passengers = passengers;
	}
}

async function runAPI() {
	const movies = (await axios.get('https://swapi.dev/api/films')).data.results;
	let films = [];

	for await (let movie of movies) {
		let film = new Film(movie.title);
		await film.getPlanets(movie.planets);
		await film.getCharacters(movie.characters);
		await film.getStarships(movie.starships);
		films.push(film);
	}
	console.log(films);
}

runAPI();
