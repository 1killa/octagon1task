const express = require("express");
const mysql   = require("mysql2");

const app  = express();
const PORT = 3000;

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
  console.log("Подключено к MySQL");
});

function getById(id, res) {
  db.query("SELECT * FROM Items WHERE id = ?", [id], (err, rows) => {
    if (err)              return res.json(null);
    if (rows.length === 0) return res.json({});
    return res.json(rows[0]);
  });
}

app.get("/", (req, res) => {
  res.send("<h1>октагон</h1>");
});

// static
app.get("/static", (req, res) => {
  res.json({ header: "Hello", body: "Octagon NodeJS Test" });
});

// dynamic
app.get("/dynamic", (req, res) => {
  const { a, b, c } = req.query;
  if (a === undefined || b === undefined || c === undefined)
    return res.json({ header: "Error" });

  const numA = Number(a), numB = Number(b), numC = Number(c);
  if (isNaN(numA) || isNaN(numB) || isNaN(numC))
    return res.json({ header: "Error" });

  res.json({ header: "Calculated", body: String((numA * numB * numC) / 3) });
});

// GET /getAllItems
app.get("/getAllItems", (req, res) => {
  db.query("SELECT * FROM Items", (err, results) => {
    if (err) return res.json(null);
    res.json(results);
  });
});

// POST /addItem?name=TEXT&desc=TEXT2
app.post("/addItem", (req, res) => {
  const { name, desc } = req.query;

  if (!name || !desc || name.trim() === "" || desc.trim() === "")
    return res.json(null);

  db.query(
    "INSERT INTO Items (name, `desc`) VALUES (?, ?)",
    [name, desc],
    (err, result) => {
      if (err) return res.json(null);
      getById(result.insertId, res);
    }
  );
});

// POST /deleteItem?id=number
app.post("/deleteItem", (req, res) => {
  const numId = Number(req.query.id);
  if (!req.query.id || isNaN(numId) || !Number.isInteger(numId) || numId <= 0)
    return res.json(null);

  db.query("SELECT * FROM Items WHERE id = ?", [numId], (err, rows) => {
    if (err)               return res.json(null);
    if (rows.length === 0) return res.json({});

    const deleted = rows[0];
    db.query("DELETE FROM Items WHERE id = ?", [numId], (err2) => {
      if (err2) return res.json(null);
      res.json(deleted);
    });
  });
});

// POST /updateItem?id=number&name=TEXT&desc=TEXT2
app.post("/updateItem", (req, res) => {
  const { name, desc } = req.query;
  const numId = Number(req.query.id);

  if (
    !req.query.id || isNaN(numId) || !Number.isInteger(numId) || numId <= 0 ||
    !name || !desc || name.trim() === "" || desc.trim() === ""
  )
    return res.json(null);

  db.query("SELECT * FROM Items WHERE id = ?", [numId], (err, rows) => {
    if (err)               return res.json(null);
    if (rows.length === 0) return res.json({});

    db.query(
      "UPDATE Items SET name = ?, `desc` = ? WHERE id = ?",
      [name, desc, numId],
      (err2) => {
        if (err2) return res.json(null);
        getById(numId, res);
      }
    );
  });
});


app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}/`);
});
