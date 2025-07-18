//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser"; 
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const password ='ILoveProgramming';
var passwordStatus = '';

app.use(bodyParser.urlencoded({ extended : true }));

app.get("/", (req, res) => { 
    res.sendFile(__dirname + "/public/index.html");
});

function passwordCheck(req, response, next) {
    if (req.body.password === password) {
        passwordStatus = 'success'
    } else {
        passwordStatus = 'fail'
    }
    next();
};

app.use(passwordCheck);

app.post("/check", (req, res) => {
    if (passwordStatus === 'success') {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    };
  });   
  
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
