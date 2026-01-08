import React from "react";
import GenreCard from "./GenreCard";
import "./BentoGrid.css";

const BentoGrid = ({ subgenres, onGenreSelect }) => {
  return (
    <div className="bento-grid">
      {subgenres.map((genre) => (
        <GenreCard key={genre.id} genre={genre} onClick={onGenreSelect} />
      ))}
    </div>
  );
};

export default BentoGrid;
