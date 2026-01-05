import React from 'react';
import './GenreCard.css';

const GenreCard = ({ genre, onClick, categoryColor }) => {
  return (
    <button 
      className="genre-card" 
      onClick={() => onClick(genre)}
      style={{ '--category-color': categoryColor || 'var(--color-text-accent)' }}
    >
      <div className="genre-title">
        {genre.nameJP}
        <span className="genre-name-en">{genre.title}</span>
      </div>
      <p className="genre-desc">{genre.description}</p>
    </button>
  );
};

export default GenreCard;
