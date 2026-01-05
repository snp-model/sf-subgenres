import React from 'react';
import './Layout.css';

const Header = () => (
  <header style={{ 
    padding: 'var(--spacing-lg) 0', 
    borderBottom: '1px solid var(--color-border-grid)',
    marginBottom: 'var(--spacing-xl)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <h1 style={{ 
        fontFamily: 'var(--font-family-display)', 
        fontSize: 'var(--font-size-2xl)',
        letterSpacing: '0.05em'
      }}>
        SFサブジャンル
      </h1>
    </div>
  </header>
);

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="layout-grid-bg"></div>
      <main className="main-content">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
