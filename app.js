const TelegramBot = require("node-telegram-bot-api");
const request = require("request");

const { botToken, movieApiUrl } = require("./settings");

const token = botToken;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/movie [whatever]"
bot.onText(/\/movie (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content
	// of the message

	const movie = match[1];
	const chatId = msg.chat.id;

	const url = `${movieApiUrl}&t=${movie}`;

	request(url, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			bot
				.sendMessage(chatId, `Loading info for ${movie} ...`, {
					parse_mode: "Markdown",
				})
				.then(() => {
					var data = JSON.parse(body);

					bot.sendPhoto(chatId, data.Poster, {
						caption: `Title: ${data.Title}\nYear: ${data.Year}\nRated: ${data.Rated}`,
					});
				});
		}
	});
});
