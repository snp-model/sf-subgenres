import React, { useEffect } from "react";
import { books } from "../../data/sampleData";
import "./DetailPanel.css";

// ショップアイコンコンポーネント
const ShopIcon = ({ shop }) => {
  const iconMap = {
    amazon: (
      <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
        <text
          x="40"
          y="15"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="15"
          fontWeight="bold"
          letterSpacing="-0.2"
          fill="#232F1E"
          textAnchor="middle"
        >
          amazon
        </text>
        <path
          d="M22 18c8 3 28 3 36 0"
          stroke="#FF9900"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M56 18l-1-1 3.5-1 0.5 3.5-3-1.5"
          stroke="#FF9900"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    bookoff: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 2v16h12V4H6m2 2h8v2H8V6m0 4h8v2H8v-2m0 4h6v2H8v-2z" />
      </svg>
    ),
  };

  return iconMap[shop] || null;
};

const DetailPanel = ({ genre, isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // パネルが開いているときメイン画面のスクロールを固定
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // クリーンアップ: コンポーネントがアンマウントされた時に元に戻す
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!genre) return null;

  // bookIds から書籍データを解決
  const resolvedBooks = (genre.bookIds || [])
    .map((id) => books[id])
    .filter(Boolean);

  // リンクアイコンのクリックハンドラ
  const handleLinkClick = (url, e) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div
        className={`detail-panel-overlay ${isOpen ? "is-open" : ""}`}
        onClick={onClose}
      />
      <div className={`detail-panel ${isOpen ? "is-open" : ""}`}>
        <div className="panel-header">
          <div>
            <h2 className="genre-name-jp">{genre.nameJP}</h2>
            <div
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              {genre.title}
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="panel-content">
          <p style={{ lineHeight: 1.8, fontSize: "var(--font-size-lg)" }}>
            {genre.detail || genre.description}
          </p>

          {resolvedBooks.length > 0 && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-family-base)",
                  color: "var(--color-text-secondary)",
                  borderBottom: "1px solid var(--color-border-grid)",
                  paddingBottom: "var(--spacing-xs)",
                  marginTop: "var(--spacing-xl)",
                  fontSize: "var(--font-size-lg)",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-sm)",
                }}
              >
                おすすめ書籍 / Recommended Books
                <span className="pr-badge">PR</span>
              </h3>

              <div className="book-grid">
                {resolvedBooks.map((book) => (
                  <div key={book.id} className="book-card">
                    <img
                      src={
                        book.asin
                          ? `https://m.media-amazon.com/images/P/${book.asin}.jpg`
                          : "https://placehold.jp/24/cccccc/ffffff/200x300.png?text=No%20Image"
                      }
                      alt={book.title}
                      className="book-cover"
                      loading="lazy"
                      onLoad={(e) => {
                        // 1x1ピクセルの透明GIF（Amazonが404の代わりに返す）を検出
                        if (
                          e.target.naturalWidth === 1 &&
                          e.target.naturalHeight === 1
                        ) {
                          const currentSrc = e.target.src;
                          if (currentSrc.includes("/images/P/")) {
                            // /P/ が透明GIFなら /I/ を試す
                            e.target.src = currentSrc.replace(
                              "/images/P/",
                              "/images/I/"
                            );
                          } else if (currentSrc.includes("/images/I/")) {
                            // /I/ も透明GIFならプレースホルダー
                            e.target.src =
                              "https://placehold.jp/24/cccccc/ffffff/200x300.png?text=No%20Image";
                          }
                        }
                      }}
                      onError={(e) => {
                        // 画像読み込み失敗時はプレースホルダーを表示
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.jp/24/cccccc/ffffff/200x300.png?text=No%20Image";
                      }}
                    />
                    <div className="book-info">
                      <div className="book-title">{book.titleJP}</div>
                      <div className="book-title-en">{book.title}</div>
                      <div className="book-meta">
                        {book.author} ({book.year})
                      </div>
                      <p className="book-description">{book.description}</p>
                      {book.links && Object.keys(book.links).length > 0 && (
                        <div className="book-links">
                          {Object.entries(book.links).map(([shop, url]) => (
                            <a
                              key={shop}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`shop-link-card ${shop}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="shop-logo">
                                <ShopIcon shop={shop} />
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 絶版・品切れ時の案内 */}
              <div className="out-of-print-notice">
                <details>
                  <summary>書籍の新刊が見つからないときは？</summary>
                  <div className="notice-details">
                    <ul>
                      <li>
                        <strong>古本屋を巡る</strong>
                        ：街の古書店で意外な出会いがあるかもしれません。
                      </li>
                      <li>
                        <strong>オンライン中古書店</strong>：
                        <span className="shop-list">
                          ブックオフ、まんだらけ、駿河屋、日本の古本屋
                        </span>
                        などをチェック。
                      </li>
                      <li>
                        <strong>復刊リクエスト</strong>：
                        <span className="shop-list">復刊ドットコム</span>や
                        <span className="shop-list">
                          東京創元社Webアンケート
                        </span>
                        で熱意を伝えましょう。
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPanel;
