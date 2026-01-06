#!/usr/bin/env node

/**
 * NDL API を使用して書籍 ISBN とカバー画像を取得し、sampleData.js を更新するスクリプト
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NDL_SEARCH_API = 'https://ndlsearch.ndl.go.jp/api/opensearch';
const NDL_THUMBNAIL_API = 'https://ndlsearch.ndl.go.jp/thumbnail';
const SAMPLE_DATA_PATH = path.join(__dirname, '../src/data/sampleData.js');
const DELAY_MS = 500; // API呼び出し間の遅延（レート制限対策）

/**
 * NDL OpenSearch API から ISBN を検索
 */
async function searchIsbn(title, author) {
  // タイトルをクリーンアップ
  const cleanTitle = title
    .replace(/[\[\(][^\]\)]*[\]\)]/g, '') // [新版] や (上) などを削除
    .replace(/[!\?！?？]/g, ' ') // 記号をスペースに
    .replace(/\s+/g, ' ')
    .trim();

  // 著者名もクリーンアップ
  const cleanAuthor = author ? author.split('＆')[0].split('&')[0].trim() : '';

  const query = `title=${encodeURIComponent(cleanTitle)}${cleanAuthor ? `&author=${encodeURIComponent(cleanAuthor)}` : ''}`;
  const url = `${NDL_SEARCH_API}?${query}&cnt=20`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`  ⚠️  NDL Search API error (${response.status}): ${title}`);
      return null;
    }
    
    const xmlText = await response.text();
    const items = xmlText.split('<item>');
    
    let bestIsbn = null;
    let fallbackIsbn = null;

    for (let i = 1; i < items.length; i++) {
       const item = items[i];
       if (item.includes('<category>記事</category>') || item.includes('<category>雑誌</category>')) continue;

       const isbnMatches = item.match(/<dc:identifier[^>]*>([0-9Xx]{10,13})<\/dc:identifier>/g);
       if (!isbnMatches) continue;

       for (const m of isbnMatches) {
         const isbn = m.match(/>([0-9Xx]+)</)[1];
         
         // 有効な ISBN かチェック（NDLBibID 0000... を弾く）
         const isIsbn13 = isbn.length === 13 && (isbn.startsWith('978') || isbn.startsWith('979'));
         const isIsbn10 = isbn.length === 10 && !isbn.startsWith('000');
         
         if (!isIsbn13 && !isIsbn10) continue;

         if (isbn.startsWith('978415')) return isbn; // ハヤカワ文庫優先
         if (isbn.startsWith('9784') && !bestIsbn) bestIsbn = isbn; // 日本国内本
         if (!fallbackIsbn) fallbackIsbn = isbn;
       }
    }
    
    return bestIsbn || fallbackIsbn;
  } catch (error) {
    console.error(`  ❌ Error searching ISBN for ${title}:`, error.message);
    return null;
  }
}

/**
 * ファイル内容の更新
 */
function updateBookInContent(content, bookId, isbn, coverUrl) {
  const bookEntryRegex = new RegExp(
    `("${bookId}"|${bookId}):\\s*\\{[\\s\\S]*?\\},`,
    'g'
  );
  
  return content.replace(bookEntryRegex, (match) => {
    let updated = match;
    if (updated.includes('isbn:')) {
      updated = updated.replace(/isbn:\s*"[^"]*"/, `isbn: "${isbn}"`);
    } else {
      updated = updated.replace(/year:\s*([0-9]+),/, `year: $1,\n    isbn: "${isbn}",`);
    }
    updated = updated.replace(/cover:\s*"[^"]*"/, `cover: "${coverUrl}"`);
    return updated;
  });
}

async function main() {
  console.log('📚 NDL API から ISBN とカバー画像を同期します...\n');
  
  const content = fs.readFileSync(SAMPLE_DATA_PATH, 'utf-8');
  const sampleDataUrl = `file://${SAMPLE_DATA_PATH}`;
  const { books } = await import(sampleDataUrl);
  
  let updatedContent = content;
  let updateCount = 0;
  
  const bookEntries = Object.entries(books);
  
  for (let i = 0; i < bookEntries.length; i++) {
    const [bookId, book] = bookEntries[i];
    
    // スキップ条件: ISBNが有効、かつカバーがNDLのURLである
    const hasValidIsbn = book.isbn && (book.isbn.startsWith('978') || (book.isbn.length === 10 && !book.isbn.startsWith('000')));
    if (hasValidIsbn && book.cover && book.cover.includes('ndlsearch.ndl.go.jp')) {
      continue;
    }
    
    console.log(`[${i + 1}/${bookEntries.length}] ${book.titleJP || book.title}`);
    const isbn = await searchIsbn(book.titleJP || book.title, book.author);
    
    if (isbn) {
      const coverUrl = `${NDL_THUMBNAIL_API}/${isbn}.jpg`;
      updatedContent = updateBookInContent(updatedContent, bookId, isbn, coverUrl);
      updateCount++;
      console.log(`  ✅ Updated: ISBN ${isbn}`);
    } else {
      console.warn(`  ⚠️  Skipped: No valid ISBN found`);
    }
    
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
  }
  
  if (updateCount > 0) {
    fs.writeFileSync(SAMPLE_DATA_PATH, updatedContent, 'utf-8');
    console.log(`\n✨ 完了: ${updateCount} 件を更新しました`);
  } else {
    console.log('\n✅ 更新の必要はありませんでした');
  }
}

main().catch(console.error);
