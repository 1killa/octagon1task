const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8871923782:AAHNJ5zmRdc7ih9JuNC6fMyVFRiyuK5wupc";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет, октагон!");
});

console.log("Бот запущен...");
