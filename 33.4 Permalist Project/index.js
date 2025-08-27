import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "1999",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function checkTasks() {
  const result = await db.query("SELECT * FROM items");
  let tasks = [];
  result.rows.forEach((id) => {
    tasks.push(id)
  });
  return tasks;
}

app.get("/", async (req, res) => {
  const items = await checkTasks(); 
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
   });
});

app.post("/add", async (req, res) => {
  const input = req.body.newItem;
  const item = await db.query(
    "INSERT INTO items (title) VALUES ($1)", [input]
  );
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const input = req.body.updatedItemTitle;
  const id = req.body.updatedItemId
  const item = await db.query(
    "UPDATE items SET title = ($1) WHERE id = $2;", [input, id ]
  );
    res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  const item = await db.query(
    "DELETE FROM items WHERE id = $1;", [id]
  );
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
