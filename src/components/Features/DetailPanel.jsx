import React, { useEffect } from 'react';
import './DetailPanel.css';

const DetailPanel = ({ genre, isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!genre) return null;

  return (
    <>
      <div 
        className={`detail-panel-overlay ${isOpen ? 'is-open' : ''}`} 
        onClick={onClose}
      />
      <div className={`detail-panel ${isOpen ? 'is-open' : ''}`}>
        <div className="panel-header">
          <div>
            <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: 'var(--font-size-2xl)' }}>
              {genre.title}
            </h2>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {genre.nameJP}
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <div className="panel-content">
          <p style={{ lineHeight: 1.8, fontSize: 'var(--font-size-lg)' }}>
            {genre.detail || genre.description}
          </p>

          {genre.books && genre.books.length > 0 && (
            <div>
              <h3 style={{ 
                fontFamily: 'var(--font-family-base)', 
                color: 'var(--color-text-secondary)',
                borderBottom: '1px solid var(--color-border-grid)',
                paddingBottom: 'var(--spacing-xs)',
                marginTop: 'var(--spacing-xl)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'bold'
              }}>
                おすすめ書籍 / Recommended Books
              </h3>
              
              <div className="book-grid">
                {genre.books.map((book, idx) => (
                  <a key={idx} href="#" className="book-card" onClick={(e) => e.preventDefault()}>
                    <img src={book.cover} alt={book.title} className="book-cover" />
                    <div className="book-info">
                      <div className="book-title">{book.titleJP}</div>
                      <div className="book-title-en">{book.title}</div>
                      <div className="book-meta">
                        {book.author} ({book.year})
                      </div>
                      <p className="book-description">
                        {book.description}
                      </p>
                      <div className="book-action">
                        [データ参照 >]
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPanel;
