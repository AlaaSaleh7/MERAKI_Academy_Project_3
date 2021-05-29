import {React,useState,useEffect } from 'react';
import axios from "axios"
export default function Dashboard() {
    const [articles, setArticles] = useState([])
    const article=articles.map((elem)=>{
    return <div>{`Title:${elem.title} 
    Description:${elem.description}`}</div>
    })
        useEffect(()=>{
            axios.get(`http://localhost:5000/articles`)
            .then((res)=>{
                setArticles(res.data);
            },[]).catch((err)=>{
    console.log(err);
    });
            })
    return(
        <>
        <div className="Dashboard">
      <div className="button" onClick={() => article}> Git All Articles </div>
        {/* <button className="button" onClick={getArticle}>Git All Articles</button> */}
        </div>
        </>
    )
    }