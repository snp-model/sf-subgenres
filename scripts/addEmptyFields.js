import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SAMPLE_DATA_PATH = path.join(__dirname, '../src/data/sampleData.js');

/**
 * sampleData.js から books オブジェクトの内容を抽出し、
 * 不足しているフィールド (isbn, links.amazon) を空文字で追加する。
 */
async function main() {
  console.log('📝 sampleData.js のデータ構造を統一します...\n');

  if (!fs.existsSync(SAMPLE_DATA_PATH)) {
    console.error(`❌ ファイルが見つかりません: ${SAMPLE_DATA_PATH}`);
    return;
  }

  let content = fs.readFileSync(SAMPLE_DATA_PATH, 'utf-8');

  // 書籍エントリを一つずつパースして更新
  // 正規表現で "id": { ... } の構造を抽出
  const bookEntryRegex = /([\s ]+)(["a-zA-Z0-9_-]+):\s*\{([\s\S]*?)\},/g;
  
  let updatedContent = content.replace(bookEntryRegex, (match, indent, bookId, body) => {
    let updatedBody = body;

    // 1. isbn フィールドの確認
    if (!updatedBody.includes('isbn:')) {
      if (updatedBody.includes('year:')) {
        updatedBody = updatedBody.replace(/(year:\s*[0-9]+,)/, `$1\n${indent}  isbn: "",`);
      } else {
        updatedBody = `\n${indent}  isbn: "",${updatedBody}`;
      }
    }

    // 2. links フィールドの確認
    if (!updatedBody.includes('links:')) {
      updatedBody = updatedBody.trimEnd();
      if (!updatedBody.endsWith(',')) updatedBody += ',';
      updatedBody += `\n${indent}  links: {\n${indent}    amazon: ""\n${indent}  }`;
    } else {
      const linksMatch = updatedBody.match(/links:\s*\{([\s\S]*?)\}/);
      if (linksMatch && !linksMatch[1].includes('amazon:')) {
        updatedBody = updatedBody.replace(/(links:\s*\{)/, `$1\n${indent}    amazon: "",`);
      }
    }

    return `${indent}${bookId}: {${updatedBody}\n${indent}},`;
  });

  // 空行やインデントの乱れを徹底的にクリーンアップ
  updatedContent = updatedContent.replace(/\n\s*\n\s*links:/g, '\n    links:');
  updatedContent = updatedContent.replace(/amazon: "",\s*\n\s*\}/g, 'amazon: ""\n    }');
  updatedContent = updatedContent.replace(/amazon: ""\s*\n\s*\n\s*\}/g, 'amazon: ""\n    }');
  updatedContent = updatedContent.replace(/,\s*\n\s*\n\s*links:/g, ',\n    links:');
  updatedContent = updatedContent.replace(/links: \{\s*\n\s*amazon: ""\s*\n\s*\}/g, 'links: {\n      amazon: ""\n    }');

  if (content !== updatedContent) {
    fs.writeFileSync(SAMPLE_DATA_PATH, updatedContent, 'utf-8');
    console.log('\n✨ 完了: データの構造を統一しました');
  } else {
    console.log('\n✅ すべての書籍はすでに正しい構造を持っています');
  }
}

main().catch(console.error);
