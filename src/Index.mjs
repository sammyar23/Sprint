import express from "express";
import mysql from "mysql2/promise"; // import promise-based version of mysql2
import pug from "pug";
import path from "path";

const app = express();
const port = 3000;

const db = await mysql.createConnection({
  host: 'database',
  user: 'user',
  password: 'password',
  database: 'population',
});

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/population", (req, res) => {
  db.execute("SELECT * FROM `moroccan_cities`", (err, rows, fields) => {
    console.log(`/population: ${rows.length} rows`);
    return res.send(rows);
  });
});

app.get("/data/population", async (req, res) => {
  try {
    // Fetch cities from database
    const [rows, fields] = await db.execute("SELECT * FROM moroccan_cities");
    // Return JSON array of population
    return res.send(rows);
  } catch (err) {
    console.error(err);
    // Return error response
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
