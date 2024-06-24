import React, { useState } from "react";
import "./navBar.css";
import AppLogo from "../../assets/App-Logo.png";

function NavBar() {
  const [active, setActive] = useState("nav-menu");

  return (
    <nav className="nav">
       
      <div className="applogo">
        <img src={AppLogo} alt=" " height="40" width="40" />
        <h1 className="nav-brand">
          FortRoam
        </h1>
      </div>

      <div className="title">
        <h1>
           Admin Dashboard 
        </h1>
      </div>

      <ul className={active}>
        <li className="nav-item">
          <a href="/places" className="nav-link">
            Places
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/blogs">
            Blogs
          </a>
        </li>
      </ul>

    </nav>
  );
}

export default NavBar;