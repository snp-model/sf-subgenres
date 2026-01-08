/**
 * bookIds の整合性検証スクリプト（簡易版）
 */

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "sampleData.js");
const content = fs.readFileSync(filePath, "utf-8");

const booksMatch = content.match(/export const books = (\{[\s\S]+?\});/);
const subgenresMatch = content.match(
  /export const subgenres = (\[[\s\S]+?\]);/
);

if (!booksMatch || !subgenresMatch) {
  console.error("データの抽出に失敗しました");
  process.exit(1);
}

let books, subgenres;
try {
  books = eval("(" + booksMatch[1] + ")");
  subgenres = eval(subgenresMatch[1]);
} catch (e) {
  console.error("パースに失敗:", e.message);
  process.exit(1);
}

const bookIds = Object.keys(books);
console.log(`📚 書籍マスタ: ${bookIds.length}冊`);

let totalBookRefs = 0;
let missingRefs = [];
let subgenreCount = 0;

subgenres.forEach((subgenre) => {
  subgenreCount++;
  if (subgenre.bookIds && subgenre.bookIds.length > 0) {
    subgenre.bookIds.forEach((id) => {
      totalBookRefs++;
      if (!books[id]) {
        missingRefs.push({ subgenre: subgenre.id, missingId: id });
      }
    });
  }
});

console.log(`📂 サブジャンル数: ${subgenreCount}`);
console.log(`🔗 書籍参照の総数: ${totalBookRefs}`);

if (missingRefs.length > 0) {
  console.error("\n❌ エラー: 以下の bookId が見つかりません:");
  missingRefs.forEach((ref) => {
    console.error(
      `  - サブジャンル "${ref.subgenre}" の bookId "${ref.missingId}"`
    );
  });
  process.exit(1);
} else {
  console.log("\n✅ 全ての bookId が正しく解決されます");

  // 新規追加書籍を確認
  const newBooks = [
    "hateshinaki-nagare-no-hate-ni",
    "adobado",
    "the-great-silence",
  ];
  console.log("\n📖 新規追加書籍:");
  newBooks.forEach((id) => {
    if (books[id]) {
      console.log(`  ✓ ${books[id].titleJP} (${books[id].title})`);
    }
  });

  process.exit(0);
}
