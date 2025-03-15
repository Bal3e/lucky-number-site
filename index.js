import express from "express";
import { readFile, appendFile } from "fs/promises";

const app = express();
const port = 3000;
let dataSites = [];
let dataGenerator = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(async (req, res, next) => {
  dataSites = await fetchData();
  next();
});

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const fetchData = async () => {
  const data = (await readFile("datajawatogel2025.txt", "utf8"))
    .split("\n")
    .map((item) => item.trim());
  return data;
};

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
//   console.log(dataGenerator.sort((a, b) => a - b));
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