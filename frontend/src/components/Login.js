import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import { useHistory } from "react-router";
import NewArticle from "./NewArticle";
export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const logUser = () => {
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data.token);
        setToken(res.data.token);
        history.push("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="login">
        <p>login</p>
        <input
          type="text"
          placeholder="email here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="Password"
          placeholder="password here"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={logUser}>login</button>
      </div>
    </>
  );
}
