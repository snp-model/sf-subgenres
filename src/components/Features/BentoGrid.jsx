import React from 'react';
import GenreCard from './GenreCard';
import './BentoGrid.css';

const BentoGrid = ({ categories, onGenreSelect }) => {
  return (
    <div className="bento-grid">
      {categories.map((category, index) => (
        <div key={category.id} className="bento-column">
          <div className="category-header" data-id={`0${index + 1}`}>
            <h2 className="category-title" style={{ borderLeft: `4px solid ${category.color || 'var(--color-text-accent)'}`, paddingLeft: 'var(--spacing-sm)' }}>
              {category.title}
            </h2>

          </div>
          <div className="category-content">
            {category.subgenres.map((genre) => (
              <GenreCard 
                key={genre.id} 
                genre={genre} 
                onClick={onGenreSelect} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;
