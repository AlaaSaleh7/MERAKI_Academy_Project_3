const express = require("express");

const mongoose = require("mongoose");

const { Users, Articles, Comment } = require("./schema");

// .env in my computer!!
require("dotenv").config();

const secret = process.env.SECRET;

const jwt = require("jsonwebtoken");

const db = require("./db");

const { uuid } = require("uuidv4");
// to has
const bcrypt = require("bcrypt");

const app = express();

// number the port
const port = 5000;

// a middleware that enables us to read the received JSON data
app.use(express.json());

// to get all the articles
// a Get request on endpoint http://localhost:5000/articles
app.get("/articles", (req, res) => {
  // set the response status code to 200 (ok)
  res.status(200);
  Articles.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// to get articles by author
// a Get request on endpoint http://localhost:5000/articles/search_1
app.get("/articles/search_1", (req, res) => {
  // query parameters way: req.query.id "/articles/search_1?author=Jouza"
  let author = req.query.author;

  Articles.find({ author })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
  // set the response status code to 200 (ok)
  res.status(200);
});

// to get articles by id
// a Get request on endpoint http://localhost:5000/articles/id
app.get("/articles/id", async (req, res) => {
  // query parameters way: req.query.id "/articles?id=3"
  const author = req.body.author;

  const user = await Users.findOne({ firstName: author });
  Articles.find({ author: user._id })
    .populate("author", "firstName")
    .exec()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
  // set the response status code to 200 (ok)
  res.status(200);
  // sends back a response article by req id
});

// to add new article
// a Post request on endpoint http://localhost:5000/articles
app.post("/articles", async (req, res) => {
  const { title, description } = req.body;
  let author1;
  await Users.findOne({
    firstName: "Alaa",
  })
    .then((result) => {
      author1 = result;
    })
    .catch((err) => {
      res.json(err);
    });
  const user1 = new Articles({
    title,
    description,
    author: author1._id,
  });

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
  const { _id, title, description } = req.body;
  Articles.findOneAndUpdate({ _id }, { title, description }, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });

  // set the response status code to 200 (ok)
  res.status(200);
  // sends back a response articles after update
});

// Delete article by id and return massage Success Delete with id
// a Delete request on endpoint http://localhost:5000/articles/id
app.delete("/articles/id", (req, res) => {
  // received route parameters are in req.params
  const { _id, title, description } = req.body;

  Articles.deleteOne({ _id }, { title, description })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Delete article by author and return massage Success Delete with author
// a Delete request on endpoint http://localhost:5000/articles/author
app.delete("/articles/author", (req, res) => {
  const { author, title, description } = req.body;

  Articles.deleteOne({ author }, { title, description })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
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
    .then((result) => {
      // console.log(result)
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
  res.status(201);
});

// Login
// a Post request on endpoint http://localhost:5000/login
app.post("/login",async (req, res) => {
  const { email, password } = req.body;
  await Users.findOne({ email }).then( async (result) => {
    if (!result) {
      return res.send({ massage: "The email doesn't exist", status: 404 });
    }
    const payload = { userId: result._id, country: result.country,
      role:{role:'admin',permissions:['MANAGE_USERS', 'CREATE_COMMENTS'] } } 
    const options = {
      expiresIn: "60m",
    };
    console.log(result);
    const token = await jwt.sign(payload, secret, options);
    console.log(result.password);  //should be a hashed password
    await bcrypt.compare(password, result.password, (err, result) => {
      if (result) {
        res.json(token);
      } else {
        return res.send({
          massage: "The password you've entered is incorrect",
          status: 403,
        });
      }
    });
  }).catch((err) => {
    res.send(err);
  });
});

//Create a new comment
// a Post request on endpoint http://localhost:5000/articles/:id/comments
const authentication = (req, res, next) => {
  if(!req.headers.authorization){
      return res.send({ massage: "the token invalid expired", status: "403" });
  } 
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if(err){
     res.send(err)
    }
    if (result) {
      req.token=result
            next();
          }
})
}
app.post("/articles/:id/comments", authentication, async (req, res) => {
  const { comment, commenter } = req.body;
  const newComment = new Comment({
    comment,
    commenter,
  });

  await newComment
    .save()
    .then((result) => {
      console.log(result);
      Articles.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: result._id } }
      ).then((result2) => {
        console.log(result2);
      });
      console.log(result._id);
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
    //try solve role massage
  //createNewComment [Level 3]
  //Use it after the authentication middleware,
  // invoke the closure function so it returns the middleware functionauthorization("CREATE_COMMENT")
  const authorization = () => {
    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i] === "CREATE_COMMENT") {
        next();
        authentication();
      } else {
        res.json({ message: "forbidden ", status: 403 });
      }
    }
    authorization("CREATE_COMMENT");
  };

});

// listening app in number of port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
