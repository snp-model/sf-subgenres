# SF サブジャンルまとめ

SF（サイエンス・フィクション）の多様なサブジャンルを解説し、それぞれのジャンルにおけるおすすめの作家や名作小説を紹介する Web サイトです。
アフィリエイトリンクを通じて、気になった書籍をすぐに購入できるようにします。

## プロジェクト概要

このプロジェクトは、SF 初心者から愛好家まで、自分の好みに合った SF 作品を見つけるためのガイドマップとなることを目指しています。
ハード SF、スペースオペラ、サイバーパンク、ディストピアなど、多岐にわたるサブジャンルを体系的に整理・解説します。

## 主な機能

- **サブジャンル解説**: 各サブジャンルの定義、歴史、特徴を分かりやすく解説。
- **おすすめ作品紹介**: ジャンルごとの必読書、名作、隠れた傑作をピックアップ。
- **動的な書影取得**: ASIN を基に Amazon から書影を自動取得・表示。
- **書籍購入リンク**: Amazon アフィリエイトリンクを設置し、スムーズな購入体験を提供。
- **レスポンシブデザイン**: PC、タブレット、スマートフォンなど、あらゆるデバイスで見やすく表示。
- **リッチな UI/UX**: モダンなデザインとインタラクションで、探索する楽しさを演出。

## データ管理

書籍データは `src/data/sampleData.js` で一元管理されています。

### 書籍エントリの構成

各書籍は以下のフィールドを持ちます：

- `asin`: Amazon 商品画像取得用の ASIN
- `links.amazon`: 商品詳細ページへのリンク（アフィリエイトリンク）

### 便利なスクリプト

- `uv run python scripts/extractAsin.py`: Amazon リンクから ASIN を抽出し、`sampleData.js` に追加。
- `node scripts/addEmptyFields.js`: 全エントリに不足している `isbn` や `links.amazon` フィールドを空文字で追加し、構造を統一。

## 技術スタック

- **Frontend**: React, Vite
- **Styling**: Vanilla CSS (Modern CSS features)
- **API**: Amazon 商品画像 CDN
- **Hosting**: GitHub Pages
- **Deployment**: GitHub Actions

## ローカルでの実行方法

```bash
# リポジトリのクローン
git clone <repository-url>

# ディレクトリへの移動
cd sf-subgenres

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## デプロイ

GitHub Actions を使用して、GitHub Pages に自動デプロイを行います。
`main` ブランチへのプッシュをトリガーとしてビルドとデプロイが実行されます。
