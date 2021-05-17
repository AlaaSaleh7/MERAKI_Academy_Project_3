const express = require("express");

const mongoose = require("mongoose");

const {Users,Articles} = require("./schema");

const db = require("./db");

const { uuid } = require("uuidv4");

const app = express();

// number the port
const port = 5000;

// a middleware that enables us to read the received JSON data
app.use(express.json());

// modify array
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

// to get all the articles
// a Get request on endpoint http://localhost:5000/articles
app.get("/articles", (req, res) => {
  // set the response status code to 200 (ok)
  res.status(200);
  Articles
  .find()
  .then((result)=>{
    res.json(result)
  })
  .catch((err)=>{
    res.send(err);
  })
});

// to get articles by author
// a Get request on endpoint http://localhost:5000/articles/search_1
app.get("/articles/search_1", (req, res) => {
  // query parameters way: req.query.id "/articles/search_1?author=Jouza"
  let author = req.query.author;

  Articles.find({author}).then((result)=>{
    res.json(result)
  })
  .catch((err)=>{
    res.send(err)
  })
  // set the response status code to 200 (ok)
  res.status(200);
  
});

// to get articles by id
// a Get request on endpoint http://localhost:5000/articles/id
app.get("/articles/id",async (req, res) => {
  // query parameters way: req.query.id "/articles?id=3"
  const author = req.body.author;
  
  const user = await Users.findOne({firstName: author})
    Articles.find({author:user._id}).populate("author","firstName")
  .exec()
  .then((result)=>{
    console.log(result)
    res.json(result)
  })
  .catch((err)=>{
    res.send(err)
  })
  // set the response status code to 200 (ok)
  res.status(200);
  // sends back a response article by req id
  
});

// to add new article
// a Post request on endpoint http://localhost:5000/articles
app.post("/articles",async (req, res) => {
  const {title, description} = req.body;
  let author1;
  await Users.findOne({
  firstName:"Alaa"
  })
  .then(
    (result)=>{
      author1=result
    })
    .catch((err)=>{
      res.json(err)
    })
    const user1 = new Articles({
      title,
      description,
      author:author1._id})

    user1
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });

});


// to update the article by id
// a Put request on endpoint http://localhost:5000/articles/id
app.put("/articles/id", (req, res) => {
  // received route parameters are in req.params
  const {_id,title, description} = req.body;
 Articles.findOneAndUpdate({_id},{title,description},{new:true})
 .then(
    (result)=>{
      res.json(result)
  })
  .catch((err)=>{
    res.send(err)
  })

  
    // set the response status code to 200 (ok)
    res.status(200);
    // sends back a response articles after update
  
  
});

// Delete article by id and return massage Success Delete with id
// a Delete request on endpoint http://localhost:5000/articles/:id
app.delete("/articles/:id", (req, res) => {
  // received route parameters are in req.params
  const id = req.params.id;
  let i;

  const found = articles.find((element, index) => {
    i = index;
    return element.id === parseInt(id);
  });
  if (found) {
    articles.splice(i, 1);
  }
  let massage = { success: true, "Success Delete article with =>": `${id}` };
  // sends back a response massage after delete article by id
  res.json(massage);
});

// Delete article by author and return massage Success Delete with author
// a Delete request on endpoint http://localhost:5000/articles
app.delete("/articles", (req, res) => {
  const author = req.body.author;
  let delet = {};

  for (i = 0; i < articles.length; i++) {
    if (author === articles[i].author) {
      delet = articles.splice(i, 1);
    }
  }

  let massage = {
    success: true,
    "Success Delete article with =>": `${author}`,
  };

  // sends back a response massage after delete article by author
  res.json(massage);
});

//create new author
// a Post request on endpoint http://localhost:5000/users
app.post("/users", (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;

  const newAuthor = new Users({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });

  newAuthor
  .save()
  .then((result)=>{
    res.json(result)
  })
  .catch((err)=>{
    res.send(err);
  })
  res.status(201)
});


// listening app in number of port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
