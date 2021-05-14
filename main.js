const express = require("express");

const {uuid} = require("uuidv4");

const app = express();

const port = 5000;

app.use(express.json())

const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

app.get("/articles", (req, res) => {
  res.status(200);
  res.json(articles);
});

app.get("/articles/search_1", (req, res) => {
  let author = req.query.author;
  const articlesAuthor = articles.filter(
    (element) => element.author === author
  );
  res.status(200);
  res.json(articlesAuthor);
});

app.get("/articles/:id", (req, res) => {
  let id = req.query.id;
  const articlesId = articles.filter((element) => element.id === parseInt(id));
  res.status(200);
  res.json(articlesId);
});

app.post("/articles", (req, res) => {
  let artical = {
    id: uuid(),
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  };
  
  articles.push(artical);
  res.status(201);
  res.json(artical);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
