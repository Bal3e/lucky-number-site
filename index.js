import express from "express";
import { readFile, appendFile } from "fs/promises";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { pool } from "./config/db.js";

const app = express();
const port = 3000;
let dataSites = [];
let dataGenerator = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("home.ejs", { dataGenerator });
});

app.post("/generate", (req, res) => {
  const { site, type } = req.body;
  generateNumber(parseInt(type), parseInt(site));
  res.redirect("/");
});

app.get("/recent-data", (req,res) => {
  res.render("recent.ejs", { dataSites })
})

app.post("/save", (req, res) => {
  saveData();
  res.redirect("/");
});

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
export default app;

// Fetch data dari db untuk dimasukkan ke dalam dataSites

const fetchData = async () => {
  const data = (await pool.query("SELECT * FROM recentdata")).rows
  data.forEach(item => dataSites.push(item.data))
};

fetchData();

// end Fetch data

const checkRepeat = (type, num) => {
  num = parseInt(num);
  const dataChecker1 = dataGenerator.map((item) => parseInt(item));
  const dataChecker2 = dataSites.map((item) => parseInt(item.slice(type)));
  if (type === 2) {
    return dataChecker1.includes(num);
  } else {
    return dataChecker1.includes(num) || dataChecker2.includes(num);
  }
};

const generateNumber = (type, count) => {
  if (type === 2 && count > 100) {
    count = 100;
  }
  if (type === 3 && count > (1000 - dataSites.length)) {
    count = 1000 - dataSites.length;
  }
  if (count > 5000) {
    count = 5000
  }
  let checkParam;
  switch (type) {
    case 2:
      checkParam = 2;
      break;
    case 3:
      checkParam = 1;
      break;
    case 4:
      checkParam = 0;
      break;
  }
  dataGenerator = [];
  for (let i = 0; i < count; i++) {
    let cacheResult = [];
    do {
      cacheResult = [];
      for (let j = 0; j < type; j++) {
        const random = Math.floor(Math.random() * 10);
        cacheResult.push(random);
      }
    } while (checkRepeat(checkParam, cacheResult.join("")));
    dataGenerator.push(cacheResult.join(""));
  }
};

const saveData = async() => {
  await appendFile('dataSave.txt', "Data Baru\n", 'utf-8');
    dataGenerator.forEach(async (item) => {
        try {
            await appendFile('dataSave.txt', `${item}\n`, 'utf8');
        } catch (error) {
            console.log(error.message)
        }
    });
}