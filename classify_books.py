import csv
import re
import sys

# Define subgenres and their keywords
# Order matters: more specific genres should come first to avoid broad categorization overriding specific ones.
headers = {
    "Engineering": "宇宙開発・工学 (Engineering)",
    "Physics": "物理・数理 (Physics / Math)",
    "Biological": "バイオ (Biological)",
    "Planetary": "地質・惑星科学 (Planetary / Geological)",
    "Cyberpunk": "サイバーパンク (Cyberpunk)",
    "Steampunk": "スチームパンク (Steampunk)",
    "PostCyberpunk": "ポスト・サイバーパンク (Post-Cyberpunk)",
    "Biopunk": "バイオパンク (Biopunk)",
    "Solarpunk": "ソーラーパンク (Solarpunk)",
    "RoboticsAI": "ロボット工学・AI (Robotics & AI)",
    "SpaceOpera": "スペースオペラ (Space Opera)",
    "Widescreen": "ワイドスクリーン・バロック (Widescreen Baroque)",
    "Military": "ミリタリー SF (Military Science Fiction)",
    "Marine": "海洋 SF (Marine SF)",
    "Botanical": "植物 SF (Botanical SF)",
    "ScienceFantasy": "サイエンス・ファンタジー (Science Fantasy)",
    "TimeTravel": "タイムトラベル / タイムループ (Time Travel / Time Loop)",
    "Mystery": "SF ミステリー (Sci-Fi Mystery)",
    "AlternateHistory": "歴史改変 SF (Alternate History)",
    "Dystopia": "ディストピア (Dystopia)",
    "PostApocalyptic": "ポストアポカリプス / 終末 SF (Post-Apocalyptic)",
    "Disaster": "災害・パニック SF (Disaster / Panic SF)",
    "NewWave": "ニュー・ウェーブ (The New Wave)",
    "Gender": "ジェンダー SF / フェミニズム SF",
    "Slipstream": "スリップストリーム (Slipstream)",
    "NewWeird": "ニュー・ウィアード (New Weird)",
    "Humor": "ユーモア / 不条理 SF (Humorous / Absurdist SF)",
    "FirstContact": "ファーストコンタクト (First Contact)",
    "Linguistics": "言語 SF (Linguistics SF)",
    "Uplift": "知性化 (Uplift)",
    "Juvenile": "ジュブナイル SF (Juvenile / YA SF)",
    "Others": "その他 (Uncategorized)",
}

genre_keywords = {
    "Botanical": ["植物", "フロラ", "Botanical"],
    "Marine": ["海洋", "深海", "潜水", "海中", "水没", "イルカ"],
    "Cyberpunk": [
        "サイバーパンク",
        "電脳",
        "ハッカー",
        "ハッキング",
        "マトリックス",
        "サイボーグ",
        "ネット",
    ],
    "Steampunk": ["スチームパンク", "蒸気", "ヴィクトリア", "レトロ"],
    "Biopunk": ["バイオパンク", "生体改造"],
    "PostCyberpunk": ["ポスト・サイバーパンク", "ポストサイバーパンク"],
    "Solarpunk": ["ソーラーパンク"],
    "Widescreen": ["ワイドスクリーン", "ワイドスクリーン・バロック"],
    "Military": [
        "ミリタリー",
        "軍事",
        "戦争",
        "宇宙戦争",
        "パワードスーツ",
        "艦隊",
        "兵器",
    ],
    "Mystery": ["ミステリ", "推理", "探偵", "警察", "犯罪", "捜査"],
    "RoboticsAI": ["ロボット", "AI", "人工知能", "アンドロイド", "機械知性", "自律"],
    "SpaceOpera": [
        "スペースオペラ",
        "スペオペ",
        "銀河帝国",
        "宇宙冒険",
        "銀河連邦",
        "艦隊",
        "スター・ウォーズ",
        "星間",
        "銀河",
    ],
    "Uplift": ["知性化", "動物", "類人猿", "イルカ", "チンパンジー"],
    "TimeTravel": [
        "時間",
        "タイムトラベル",
        "タイムマシン",
        "ループ",
        "タイムパラドックス",
        "クロノ",
        "過去",
        "未来",
    ],
    "AlternateHistory": [
        "歴史改変",
        "改変歴史",
        "パラレルワールド",
        "もしも",
        "枢軸国勝利",
    ],
    "Dystopia": ["ディストピア", "管理社会", "全体主義", "監視", "抑圧"],
    "PostApocalyptic": [
        "ポストアポカリプス",
        "終末",
        "文明崩壊",
        "破滅",
        "サバイバル",
        "廃墟",
    ],
    "Disaster": [
        "災害",
        "パニック",
        "パンデミック",
        "氷河期",
        "隕石",
        "水没",
        "感染",
        "ウイルス",
    ],
    "Linguistics": ["言語", "翻訳", "コミュニケーション"],
    "Gender": ["ジェンダー", "フェミニズム", "性差", "両性具有"],
    "FirstContact": [
        "ファーストコンタクト",
        "未知との遭遇",
        "異星人",
        "エイリアン",
        "来訪",
        "侵略",
    ],
    "Engineering": [
        "宇宙開発",
        "工学",
        "宇宙ステーション",
        "軌道エレベータ",
        "ロケット",
        "テザー",
        "月面基地",
    ],
    "Physics": [
        "物理",
        "量子",
        "数学",
        "相対性理論",
        "多元宇宙",
        "エントロピー",
        "ブラックホール",
        "ハードSF",
    ],
    "Biological": [
        "バイオ",
        "遺伝子",
        "進化",
        "クローン",
        "生態系",
        "変異",
        "ミュータント",
    ],
    "Planetary": ["惑星", "地質", "テラフォーミング", "火星植民", "入植"],
    "NewWave": ["ニュー・ウェーブ", "実験的", "内宇宙", "心理", "ドラッグ", "幻覚"],
    "Slipstream": [
        "スリップストリーム",
        "奇妙",
        "不条理",
        "メタフィクション",
        "幻想",
        "マジックリアリズム",
        "文学",
    ],
    "NewWeird": ["ニュー・ウィアード", "異形"],
    "Humor": ["ユーモア", "風刺", "コメディ", "笑い", "ドタバタ"],
    "Juvenile": ["ジュブナイル", "YA", "青春", "少年", "少女"],
    "ScienceFantasy": [
        "サイエンス・ファンタジー",
        "ファンタジー",
        "神話",
        "魔法",
        "剣と惑星",
    ],
}


books_by_genre = {k: [] for k in headers.keys()}


def classify_book(keywords_str):
    keywords = keywords_str.lower()

    # Try to match specific keywords first
    formatted_keywords = [k.strip() for k in keywords_str.split("、") if k.strip()]

    # Special Handling based on keywords
    for genre, keys in genre_keywords.items():
        for key in keys:
            if key.lower() in keywords:
                return genre

    # Fallback for "Hard SF" if not caught by specific biology/physics etc
    if "ハードsf" in keywords or "ハードｓｆ" in keywords:
        # Default Hard SF to Physics if no other details, or check others
        if "宇宙" in keywords:
            return "Engineering"
        return "Physics"

    # Fallback to Others
    return "Others"


csv_file = "docs/my-collection.csv"

try:
    with open(csv_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            title = row.get("書名", "Unknown")
            author = row.get("著者名", "Unknown")
            keywords = row.get("ジャンル・キーワード（参考）", "")

            if not title or title == "書名":
                continue

            genre_key = classify_book(keywords)
            books_by_genre[genre_key].append(
                f"- **{title}** ({author}) - Keywords: {keywords}"
            )

except FileNotFoundError:
    print(f"Error: {csv_file} not found.")
    sys.exit(1)

# Write to Markdown file
output_file = "docs/subgenres_classification_result.md"
with open(output_file, "w", encoding="utf-8") as f:
    f.write("# 書籍コレクション サブジャンル分類一覧\n\n")
    f.write(f"合計書籍数: {sum(len(v) for v in books_by_genre.values())}\n\n")

    # Group 1: Hard SF
    group1 = ["Engineering", "Physics", "Biological", "Planetary"]
    f.write("## 1. ハード SF と科学の極北\n\n")
    for key in group1:
        if books_by_genre[key]:
            f.write(f"### {headers[key]}\n")
            for book in books_by_genre[key]:
                f.write(f"{book}\n")
            f.write("\n")

    # Group 2: Punk
    group2 = ["Cyberpunk", "Steampunk", "PostCyberpunk", "Biopunk", "Solarpunk"]
    f.write("## 2. テクノロジーとパンクの美学\n\n")
    for key in group2:
        if books_by_genre[key]:
            f.write(f"### {headers[key]}\n")
            for book in books_by_genre[key]:
                f.write(f"{book}\n")
            f.write("\n")

    # Group 3: Others
    group3 = [
        k
        for k in headers.keys()
        if k not in group1 and k not in group2 and k != "Others"
    ]
    f.write("## 3. その他の SF サブジャンル\n\n")
    for key in group3:
        if books_by_genre[key]:
            f.write(f"### {headers[key]}\n")
            for book in books_by_genre[key]:
                f.write(f"{book}\n")
            f.write("\n")

    # Uncategorized
    if books_by_genre["Others"]:
        f.write("## 未分類 / その他\n\n")
        for book in books_by_genre["Others"]:
            f.write(f"{book}\n")

print(f"Classification completed. Saved to {output_file}")
