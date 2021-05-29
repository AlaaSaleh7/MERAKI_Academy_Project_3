
import {React,useState} from 'react'
import { BrowserRouter as Router,Route ,Switch} from "react-router-dom";
import axios from "axios"

export default function NewArticle({token}){
const [title,setTitle]=useState("");
const [description, setDescription] = useState("")
const [y, setY] = useState(false)
const [x, setX] = useState(false)


const createArticle=()=>{
    console.log(title);
    console.log(description)
    console.log(token)
    axios.post("http://localhost:5000/articles",{
  title,
  description},
  {
headers:{
    Authorization: "Bearer "  + token
}
    }).then((res)=>{
    console.log(res.data) 
    if(!res.data.errors){
        setY(true)
       setX(false)
      }else{
          setY(false)
          setX(true)
      }
}).catch((err)=>{ 
  console.log(err);
  });
}
return (
    <>
    <div className="newArticle">
    <p>New Article</p>
    <input type="text" placeholder="article title here"onChange={(e) => {
    setTitle(e.target.value)}}/>
    <label ></label>
    <textarea placeholder="article description here"onChange={(e) => {
    setDescription(e.target.value)}}></textarea>
    <button className="button" onClick={createArticle}> Create New Article </button>
    {y?(<div className="massageSuccessful"> The user has been created successfully</div>):null}
    {x?(<div className="massageError">Error happened while creating a new article, please try again</div>):null}
    </div>
    </>
)
    }

