import React from "react";
import { Link, Switch } from "react-router-dom";

export default function Navigator({token}) {
  //console.log(token);
  return (
<>
    <div className="Navigator">

{!token? <Link to="/Login">login</Link>:null}
{!token?<Link to="/Register">register</Link>:null}

{token?<Link to="/Dashboard">Dashboard</Link>:null}
{token?<Link to="/NewArticle">NewArticle</Link>:null}

    </div>
    </>
  );
}
