const express = require ("express");

const app = express();

const port = 5000;

const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    ];


    app.get('/articles',(req,res)=>{
        res.status(200);
        res.json(articles);
    });


    app.get('/articles/search_1',(req,res)=>{
        let author = req.query.author
        const articlesAuthor = articles.filter((element) => element.author === author)
        res.status(200); 
        res.json(articlesAuthor);
    });

    app.get('/articles/:id', (req,res)=>{
        let id = req.query.id
        const articlesId = articles.filter((element) => element.id === parseInt(id))
        res.status(200); 
        res.json(articlesId);
    });

   


    app.listen(port,()=>{
        console.log(`Example app listening at http://localhost:${port}`);
    })
