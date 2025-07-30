import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="/logoSportSee.svg" alt="SportSee" className="logo-image" />
      </Link>
      <Link to="/" className="nav-link">
        Accueil
      </Link>
      <Link to="/profil" className="nav-link">
        Profil
      </Link>
      <Link to="/reglage" className="nav-link">
        Réglage
      </Link>
      <Link to="/communaute" className="nav-link">
        Communauté
      </Link>
    </header>
  );
};

export default Header;
