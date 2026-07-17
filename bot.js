const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8871923782:AAHNJ5zmRdc7ih9JuNC6fMyVFRiyuK5wupc";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет, октагон!");
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const text =
    "Список доступных команд:\n\n" +
    "/site - отправляет ссылку на сайт Октагона\n" +
    "/creator - отправляет ФИО создателя бота";
  bot.sendMessage(chatId, text);
});

bot.onText(/\/site/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "https://octagon-students.ru/");
});

bot.onText(/\/creator/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Хусхаев Андрей");
});

console.log("Бот запущен...");
