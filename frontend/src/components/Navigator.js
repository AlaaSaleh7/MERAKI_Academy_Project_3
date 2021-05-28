import React from "react";
import { Link } from "react-router-dom";

export default function Navigator() {
  return (
    <div className="Navigator">
      <Link to="/Login">login</Link>
      <Link to="/Register">register</Link>

      <Link to="/Dashboard">Dashboard</Link>
      <Link to="/NewArticle">NewArticle</Link>

    </div>
  );
}
