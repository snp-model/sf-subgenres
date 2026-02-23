import React from "react";
import { Link } from "react-router-dom";
import "./GenreCard.css";

const GenreCard = ({ genre, onClick }) => {
  return (
    <Link
      to={`/genre/${genre.id}`}
      className="genre-card"
      style={{ "--category-color": "var(--color-text-accent)", textDecoration: "none", display: "block" }}
      onClick={(e) => {
        if (onClick) onClick(genre);
      }}
    >
      <div className="genre-title">
        {genre.nameJP}
        <span className="genre-name-en">{genre.title}</span>
      </div>
      <p className="genre-desc">{genre.description}</p>
    </Link>
  );
};

export default GenreCard;
