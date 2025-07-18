import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  app.post("/wallpaper", async (req, res) => {
    try {
      const result = await axios.get("https://picsum.photos/seed/picsum/");
      console.log(result.data)
      res.render("index.ejs");
    } catch (error) {
      res.render("index.ejs");
      console.log(error.response.data)
    }
  });










app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });