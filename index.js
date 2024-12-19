import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "",
  port: 5432  
});

db.connect();

// amount of questions user got right
let totalCorrect = 0;
// high score
let highScore = 0;

// array of countries
let quiz = [];

db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};
let arrayOfCountries = [];

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { 
    question: currentQuestion,
    highScore: highScore,
    arrayOfCountries
   });
});

// POST a new post
app.post("/submit", (req, res) => {
  const submit = req.body.submit;
  if (submit === "submit"){
    // get rid of spaces
    let answer = req.body.answer.trim();
    let isCorrect = false;
    console.log(answer);
    console.log(currentQuestion.name.toLowerCase());
    // compare user input with country name
    if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
      totalCorrect++;
      if (totalCorrect > highScore) {
        highScore = totalCorrect
      }
      console.log(totalCorrect);
      // make isCorrect true in order to continue
      isCorrect = true;
    }
    // get a new country
    nextQuestion();
    res.render("index.ejs", {
      question: currentQuestion,
      wasCorrect: isCorrect,
      totalScore: totalCorrect,
      highScore: highScore,
      arrayOfCountries: arrayOfCountries
    });
  } 
  else if (submit === "give-up") {
    res.redirect("/")
  }
});

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  const randomCountry1 = quiz[Math.floor(Math.random() * quiz.length)];
  const randomCountry2 = quiz[Math.floor(Math.random() * quiz.length)];
  const randomCountry3 = quiz[Math.floor(Math.random() * quiz.length)];
  arrayOfCountries = [randomCountry, randomCountry1, randomCountry2, randomCountry3]
  shuffle(arrayOfCountries);
  currentQuestion = randomCountry;
}

function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
