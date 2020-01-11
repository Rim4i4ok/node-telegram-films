const config = require("config");

const botToken = config.get("botToken");

const movieApi = config.get("movieApi");
const movieApiKey = config.get("movieApiKey");

const movieApiUrl = `${movieApi}/?apikey=${movieApiKey}`;

module.exports = { botToken, movieApiUrl };
