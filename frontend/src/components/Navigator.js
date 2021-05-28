import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function Navigator() {
  return (
    <div className="Navigator">
      <Link to="/login">
        
        login
        
      </Link>
      <Link to="/register">
        
        register
      </Link>
    </div>
  );
}
