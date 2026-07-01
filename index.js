const express = require("express");
const app = express();
const PORT = 3000;

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

  if (a === undefined || b === undefined || c === undefined) {
    return res.json({ header: "Error" });
  }

  const numA = Number(a);
  const numB = Number(b);
  const numC = Number(c);

  if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
    return res.json({ header: "Error" });
  }

  const result = (numA * numB * numC) / 3;

  res.json({ header: "Calculated", body: String(result) });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}/`);
});
