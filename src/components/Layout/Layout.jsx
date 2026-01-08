import React from "react";
import "./Layout.css";

const Header = () => (
  <header
    style={{
      padding: "var(--spacing-lg) 0",
      borderBottom: "1px solid var(--color-border-grid)",
      marginBottom: "var(--spacing-xl)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <h1 className="main-title">SFサブジャンルまとめ</h1>
    </div>
  </header>
);

const Footer = () => (
  <footer
    style={{
      marginTop: "var(--spacing-2xl)",
      padding: "var(--spacing-xl) 0",
      borderTop: "1px solid var(--color-border-grid)",
      color: "var(--color-text-secondary)",
      fontSize: "var(--font-size-xs)",
      textAlign: "center",
      lineHeight: 1.6,
    }}
  >
    <p>© 2026 snp</p>
    <p>Amazonのアソシエイトとして、適格販売により収入を得ています。</p>
  </footer>
);

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="layout-grid-bg"></div>
      <main className="main-content">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
