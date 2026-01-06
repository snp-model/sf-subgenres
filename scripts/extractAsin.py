#!/usr/bin/env python3
"""
amzn.toリンクからASINを抽出し、sampleData.jsを更新するスクリプト

Usage:
    uv run python scripts/extractAsin.py
"""

import re
import urllib.request
from pathlib import Path
import time


def extract_asin_from_url(url: str) -> str | None:
    """AmazonのURLからASINを抽出する"""
    # /dp/{ASIN} または /gp/product/{ASIN} パターン
    patterns = [
        r"/dp/([A-Z0-9]{10})",
        r"/gp/product/([A-Z0-9]{10})",
        r"/product/([A-Z0-9]{10})",
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


def resolve_short_url(short_url: str) -> str | None:
    """amzn.toの短縮URLを展開してASINを取得する"""
    if not short_url or not short_url.startswith("https://amzn.to/"):
        return None

    try:
        # リダイレクトを追ってfinal URLを取得
        req = urllib.request.Request(short_url)
        req.add_header("User-Agent", "Mozilla/5.0")
        with urllib.request.urlopen(req, timeout=10) as response:
            html_content = response.read().decode('utf-8', errors='ignore')
            
            # HTMLから画像URLを抽出（data-old-hires属性から）
            # パターン: "https://m.media-amazon.com/images/I/{IMAGE_ID}._SL1500_.jpg"
            image_patterns = [
                r'data-old-hires["\']:\s*["\']https://m\.media-amazon\.com/images/I/([A-Z0-9]+)\.',
                r'"hiRes":\s*"https://m\.media-amazon\.com/images/I/([A-Z0-9]+)\.',
                r'"large":\s*"https://m\.media-amazon\.com/images/I/([A-Z0-9]+)\.',
            ]
            
            for pattern in image_patterns:
                match = re.search(pattern, html_content)
                if match:
                    image_id = match.group(1)
                    print(f"  🖼️  画像ID: {image_id}")
                    return image_id
            
            # 画像IDが見つからない場合は、URLからASINを抽出
            final_url = response.url
            asin = extract_asin_from_url(final_url)
            if asin:
                print(f"  📦 商品ASIN: {asin} (画像IDが見つからないため代用)")
            return asin
            
    except Exception as e:
        print(f"  エラー: {short_url} - {e}")
        return None


def update_sample_data(file_path: Path) -> int:
    """sampleData.jsファイルを更新してASINを追加する"""
    content = file_path.read_text(encoding="utf-8")
    
    # amzn.toリンクを持つ書籍を検索
    amazon_pattern = r'amazon:\s*"(https://amzn\.to/[^"]+)"'
    matches = list(re.finditer(amazon_pattern, content))
    
    print(f"📚 {len(matches)} 件のAmazonリンクを検出しました\n")
    
    # ASINを収集
    asin_map = {}  # amazon_url -> asin
    for i, match in enumerate(matches):
        amazon_url = match.group(1)
        print(f"[{i + 1}/{len(matches)}] {amazon_url}")
        
        asin = resolve_short_url(amazon_url)
        if asin:
            asin_map[amazon_url] = asin
            print(f"  ✅ ASIN: {asin}")
        else:
            print(f"  ⚠️  ASIN抽出失敗")
        
        time.sleep(0.3)  # レート制限対策
    
    if not asin_map:
        print("\n更新対象がありませんでした")
        return 0
    
    # ファイルを更新：year行の後にasinを挿入
    updated_content = content
    added_count = 0
    
    for amazon_url, asin in asin_map.items():
        # amazon URLの位置を見つける
        amazon_pos = updated_content.find(f'amazon: "{amazon_url}"')
        if amazon_pos == -1:
            continue
        
        # この書籍エントリの開始位置を見つける
        before_amazon = updated_content[:amazon_pos]
        
        # エントリ内にすでにasinがあるかチェック
        # 最も近い "year:" を見つける
        year_pos = before_amazon.rfind("year:")
        if year_pos == -1:
            continue
        
        section = updated_content[year_pos:amazon_pos]
        if "asin:" in section:
            print(f"  スキップ（既にasin存在）: {amazon_url}")
            continue
        
        # year行の終わり（改行）を見つけて、その後にasinを挿入
        year_line_end = updated_content.find("\n", year_pos)
        if year_line_end == -1:
            continue
        
        # インデントを取得（year行のインデントを使用）
        line_start = updated_content.rfind("\n", 0, year_pos) + 1
        indent_match = re.match(r"(\s*)", updated_content[line_start:])
        indent = indent_match.group(1) if indent_match else "    "
        
        # asin行を挿入
        insert_pos = year_line_end + 1
        asin_line = f'{indent}asin: "{asin}",\n'
        
        updated_content = (
            updated_content[:insert_pos] + asin_line + updated_content[insert_pos:]
        )
        added_count += 1
        print(f"  ➕ asin追加: {asin}")
    
    if added_count > 0:
        file_path.write_text(updated_content, encoding="utf-8")
        print(f"\n✨ {added_count} 件のASINを追加しました")
    else:
        print("\n更新はありませんでした")
    
    return added_count


def main():
    print("🔍 Amazon ASINを抽出します...\n")
    
    script_dir = Path(__file__).parent
    sample_data_path = script_dir.parent / "src" / "data" / "sampleData.js"
    
    if not sample_data_path.exists():
        print(f"❌ ファイルが見つかりません: {sample_data_path}")
        return
    
    update_sample_data(sample_data_path)


if __name__ == "__main__":
    main()
