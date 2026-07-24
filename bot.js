const TelegramBot = require("node-telegram-bot-api");
const mysql = require("mysql2");

const TOKEN = "8871923782:AAHNJ5zmRdc7ih9JuNC6fMyVFRiyuK5wupc";

const bot = new TelegramBot(TOKEN, { polling: true });

const db = mysql.createConnection({
  host    : "localhost",
  user    : "root",
  password: "",
  database: "ChatBotTests"
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к БД:", err.message);
    return;
  }
  console.log("Бот подключен к MySQL");
});

function formatItem(item) {
  return `(${item.id}) - ${item.name}: ${item.desc}`;
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет, октагон!");
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const text =
    "Список доступных команд:\n\n" +
    "/site - отправляет ссылку на сайт Октагона\n" +
    "/creator - отправляет ФИО создателя бота\n" +
    "/randomItem - возвращает случайный предмет из БД\n" +
    "/deleteItem <id> - удаляет предмет по ID\n" +
    "/getItemByID <id> - возвращает предмет по ID";
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

bot.onText(/\/randomItem/, (msg) => {
  const chatId = msg.chat.id;

  db.query("SELECT * FROM Items ORDER BY RAND() LIMIT 1", (err, rows) => {
    if (err) {
      console.error(err);
      return bot.sendMessage(chatId, "Ошибка");
    }
    if (rows.length === 0) {
      return bot.sendMessage(chatId, "Ошибка");
    }
    bot.sendMessage(chatId, formatItem(rows[0]));
  });
});

bot.onText(/\/deleteItem(?:\s+(\S+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const idParam = match[1];
  const id = Number(idParam);

  if (!idParam || isNaN(id) || !Number.isInteger(id) || id <= 0) {
    return bot.sendMessage(chatId, "Ошибка");
  }

  db.query("SELECT * FROM Items WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return bot.sendMessage(chatId, "Ошибка");
    }
    if (rows.length === 0) {
      return bot.sendMessage(chatId, "Ошибка");
    }

    db.query("DELETE FROM Items WHERE id = ?", [id], (err2) => {
      if (err2) {
        console.error(err2);
        return bot.sendMessage(chatId, "Ошибка");
      }
      bot.sendMessage(chatId, "Удачно");
    });
  });
});

bot.onText(/\/getItemByID(?:\s+(\S+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const idParam = match[1];
  const id = Number(idParam);

  if (!idParam || isNaN(id) || !Number.isInteger(id) || id <= 0) {
    return bot.sendMessage(chatId, "Ошибка");
  }

  db.query("SELECT * FROM Items WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return bot.sendMessage(chatId, "Ошибка");
    }
    if (rows.length === 0) {
      return bot.sendMessage(chatId, "Ошибка");
    }
    bot.sendMessage(chatId, formatItem(rows[0]));
  });
});

console.log("Бот запущен...");
