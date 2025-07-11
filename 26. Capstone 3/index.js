import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/submit", (req, res) => {
    var title = req.body["title"];
    var content = req.body["content"];
    res.render("index.ejs", {
      entryTitle: title,
      entryContent: content,
    });
  });

app.get("/submit-entry", (req, res) => {
    res.render("submit-entry.ejs");
  });

app.get("/replace", (req, res) => {
    res.render("replace.ejs");
  });

app.get("/delete", (req, res) => {
    res.redirect("/");
  });


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  