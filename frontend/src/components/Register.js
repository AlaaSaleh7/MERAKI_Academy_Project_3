import React, { useState } from "react";
import axios from "axios";

export default function Register() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [err,setErr]=useState(false)
 

  const newRegister = () => {
    axios
      .post("http://localhost:5000/users", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
      })
      .then((res) => {
        if(!res.data.errors){
          setSuccess(true)
          setErr(false)
        }else{
          setSuccess(false)
          setErr(true)
        }
        console.log(res.data);
      })
      .catch((err) => {
        //res?<div> ppppp</div>:null
        console.log(err);
        
      });
  };


  return (
    <div className="Register">
      <p>register:</p>
      <input
        type="text"
        placeholder="firstName here"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="last name here"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />

      <input
        type="number"
        placeholder="age here"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="country here"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="email here"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        type="password"
        placeholder="password here"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button className="button" onClick={newRegister}>
        Register
      </button>
     
     {success?(<div className='massageSuccess'>The User has been created successfully</div>):null}
     {err?(<div className='massageErr'>Error happened while a new article, please try again</div>):null}
    </div>
  );
}
