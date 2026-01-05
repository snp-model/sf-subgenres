export const categories = [
  {
    id: "hardsf",
    title: "ハードSF",
    subtitle: "科学的想像力の極北",
    description: "科学的整合性と論理を物語の中核に据える、SFの王道ジャンル。",
    color: "var(--color-text-accent)",
    subgenres: [
      {
        id: "engineering",
        title: "Engineering",
        nameJP: "宇宙開発・工学",
        description: "技術的リアリズムと問題解決重視",
        detail: "具体的な技術ディテールと問題解決（エンジニアリング）を重視。巨大構造物の建設や極限環境でのサバイバルなど、物理的な制約の中での奮闘を描く。",
        books: [
          {
            title: "The Martian",
            titleJP: "火星の人",
            author: "アンディ・ウィアー",
            year: 2011,
            cover: "https://images-na.ssl-images-amazon.com/images/I/817+D5p+drL.jpg",
            description: "火星にたった一人取り残された植物学者の、科学知識とユーモアを武器にした究極のサバイバル。徹底したリアリズムと前向きな精神が胸を打つ傑作。"
          },
          {
            title: "Rendezvous with Rama",
            titleJP: "宇宙のランデヴー",
            author: "アーサー・C・クラーク",
            year: 1973,
            cover: "https://images-na.ssl-images-amazon.com/images/I/81p-6yW+c+L.jpg",
            description: "太陽系に飛来した謎の巨大円筒物体の調査を描く、ハードSFの金字塔。異星の超巨大構造物の描写が圧倒的なセンス・オブ・ワンダーをもたらす。"
          },
          {
            title: "Project Hail Mary",
            titleJP: "プロジェクト・ヘイル・メアリー",
            author: "アンディ・ウィアー",
            year: 2021,
            cover: "https://images-na.ssl-images-amazon.com/images/I/91tO0NCNwwL.jpg",
            description: "記憶を失った男と、異星の友人との友情を描く宇宙救済ミッション。科学パズルと感動的なドラマが融合した、現代ハードSFの最高峰。"
          },
          {
            title: "Seveneves",
            titleJP: "七人のイヴ",
            author: "ニール・スティーヴンスン",
            year: 2015,
            cover: "https://images-na.ssl-images-amazon.com/images/I/815c4K+c+L.jpg",
            description: "月の崩壊によって滅亡の危機に瀕した人類が、宇宙で生き延びるために奮闘する壮大な年代記。軌道力学と遺伝子工学の描写が緻密。"
          }
        ]
      },
      {
        id: "physics",
        title: "Physics / Math",
        nameJP: "物理・数理",
        description: "理論物理学や数学的概念の探求",
        detail: "素粒子物理、天体力学、量子論などの理論的探求を物語の核とする。通常の直感では理解しがたい物理現象や宇宙の構造を描く。",
        books: [
          {
            title: "Dragon's Egg",
            titleJP: "竜の卵",
            author: "ロバート・L・フォワード",
            year: 1980,
            cover: "https://images-na.ssl-images-amazon.com/images/I/91r4-Nn+g1L.jpg",
            description: "中性子星の表面、超重力環境下で進化した知的生命体「チーラ」と人類のコンタクトを描く。ハードSFの極北とも言える作品。"
          },
          {
            title: "The Three-Body Problem",
            titleJP: "三体",
            author: "劉慈欣",
            year: 2008,
            cover: "https://images-na.ssl-images-amazon.com/images/I/919XM42JQlL.jpg",
            description: "中国発、世界的ベストセラー。異星文明との接触がもたらす絶望と希望、そして物理法則さえも兵器となる壮絶な宇宙史。"
          }
        ]
      },
      {
        id: "biological",
        title: "Biological",
        nameJP: "バイオ",
        description: "生物学、遺伝子、進化の可能性",
        detail: "遺伝子工学、進化生物学、生態系シミュレーションに基づく。生命の改造や、全く異なる進化を遂げた生態系の描写が特徴。",
        books: []
      },
      {
        id: "planetary",
        title: "Planetary / Geological",
        nameJP: "地質・惑星科学",
        description: "惑星規模の物理現象とテラフォーミング",
        detail: "テラフォーミング（惑星改造）や地殻変動など、惑星規模の物理現象を描く。地質学的なタイムスケールや環境変化がテーマ。",
        books: []
      }
    ]
  },
  {
    id: "punk",
    title: "〇〇パンク",
    subtitle: "技術と社会の相克",
    description: "技術的美学と反骨精神",
    color: "#F97316", // Orange accent
    subgenres: [
      {
        id: "cyberpunk",
        title: "Cyberpunk",
        nameJP: "サイバーパンク",
        description: "電脳、ハイテク、地下社会",
        detail: "High Tech, Low Life. 電脳空間、身体改造、巨大企業の支配。高度に発達したネットワーク社会の影と、そこで生きるアウトサイダーを描く。",
        books: []
      },
      {
        id: "postcyberpunk",
        title: "Post-Cyberpunk",
        nameJP: "ポスト・サイバーパンク",
        description: "技術が日常化した社会のリアリティ",
        detail: "サイバーパンクの主題を継承しつつ、技術が日常化した社会をより現実的、あるいは肯定的に描く。社会構造や個人の役割により焦点が当たる。",
        books: []
      },
      {
        id: "biopunk",
        title: "Biopunk",
        nameJP: "バイオパンク",
        description: "生体工学と生命倫理のダークサイド",
        detail: "サイバーパンクの技術要素を「デジタル」から「バイオ（遺伝子工学・生体改造）」に置き換えたジャンル。生命倫理やアイデンティティの変容を問う。",
        books: []
      },
      {
        id: "solarpunk",
        title: "Solarpunk",
        nameJP: "ソーラーパンク",
        description: "持続可能な未来と環境との共生",
        detail: "環境問題への応答として生まれたジャンル。アール・ヌーヴォー的な美学と、再生可能エネルギーに基づいた持続可能で明るい未来社会を構想する。",
        books: []
      }
    ]
  },
  {
    id: "others",
    title: "その他のジャンル",
    subtitle: "物語と驚異の冒険",
    description: "バラエティ豊かなSFのサブジャンル",
    color: "#10B981", // Green accent
    subgenres: [
      {
        id: "spaceopera",
        title: "Space Opera",
        nameJP: "スペースオペラ",
        description: "宇宙を舞台にした壮大な冒険活劇",
        detail: "銀河を舞台にした壮大な冒険、宇宙戦艦同士の艦隊戦、英雄の活躍、銀河帝国の興亡などを描くエンターテインメント性の高いジャンル。",
        books: []
      },
      {
        id: "widescreen",
        title: "Widescreen Baroque",
        nameJP: "ワイドスクリーン・バロック",
        description: "奔放で破天荒な超スケールSF",
        detail: "スペースオペラの一種だが、より奔放な想像力、時間・空間の巨大なスケール、複雑怪奇で破天荒なプロットを特徴とする。",
        books: []
      },
      {
        id: "military",
        title: "Military SF",
        nameJP: "ミリタリーSF",
        description: "宇宙戦争と軍事技術のリアリズム",
        detail: "軍事組織、戦術、兵器技術、兵士の心理を詳細に描く。宇宙艦隊戦やパワードスーツによる歩兵戦などが主な題材。",
        books: []
      },
      {
        id: "marine",
        title: "Marine SF",
        nameJP: "海洋SF",
        description: "深海や海洋惑星を舞台にした冒険",
        detail: "海中都市、深海探査、全域が海に覆われた海洋惑星など、海を主たる舞台とするSF。未知の生物や高圧環境下のサバイバルを描く。",
        books: []
      },
      {
        id: "sciencefantasy",
        title: "Science Fantasy",
        nameJP: "サイエンス・ファンタジー",
        description: "科学と魔法、神話の融合",
        detail: "科学的論理よりも幻想性や神話的要素を重視した作品、あるいは高度な科学技術と魔法的な要素が融合した世界観を描く。",
        books: []
      },
      {
        id: "timetravel",
        title: "Time Travel",
        nameJP: "タイムトラベル / ループ",
        description: "時間移動と因果律のパラドックス",
        detail: "過去や未来への時間移動、あるいは特定の時間を繰り返す「タイムループ」を扱う。歴史改変や因果律のパラドックスがテーマになることが多い。",
        books: []
      },
      {
        id: "sfmystery",
        title: "Sci-Fi Mystery",
        nameJP: "SFミステリー",
        description: "未来技術が鍵を握る謎解き",
        detail: "SF的設定（ロボット、クローン、仮想空間など）や未来技術をトリックやガジェットとして不可欠な要素に取り入れたミステリー。",
        books: []
      },
      {
        id: "alternatehistory",
        title: "Alternate History",
        nameJP: "歴史改変SF",
        description: "「もしも」の歴史を描く",
        detail: "「もし第二次世界大戦で枢軸国が勝っていたら」など、歴史の重要な分岐点を変更し、そこから派生した異なる歴史世界（パラレルワールド）を描く。",
        books: []
      },
      {
        id: "dystopia",
        title: "Dystopia",
        nameJP: "ディストピア",
        description: "管理社会と絶望的な未来",
        detail: "徹底管理された全体主義的な社会や、人間性が抑圧された暗黒の未来を描く。ユートピア（理想郷）の対義語。",
        books: []
      },
      {
        id: "postapocalyptic",
        title: "Post-Apocalyptic",
        nameJP: "ポストアポカリプス",
        description: "文明崩壊後の世界での生存",
        detail: "核戦争、疫病、環境破壊などで文明が崩壊した後の世界を舞台に、生存者たちのサバイバルや文明の再生（あるいは黄昏）を描く。",
        books: []
      },
      {
        id: "newwave",
        title: "The New Wave",
        nameJP: "ニュー・ウェーブ",
        description: "内宇宙と実験的文学性",
        detail: "1960年代に起きたSFの変革運動。宇宙開発などの「外宇宙」よりも、心理や意識などの「内宇宙」を志向し、文学的な実験性や社会批評を取り入れた。",
        books: []
      },
      {
        id: "gendersf",
        title: "Gender / Feminism SF",
        nameJP: "ジェンダー / フェミニズムSF",
        description: "性差と社会役割の思考実験",
        detail: "性差がない世界や、男女の役割が逆転した世界などを描くことで、現実社会のジェンダー観を問い直す思考実験的なSF。",
        books: []
      },
      {
        id: "slipstream",
        title: "Slipstream",
        nameJP: "スリップストリーム",
        description: "「奇妙」で分類不能な文学",
        detail: "SF、ファンタジー、主流文学の境界にあるジャンル。認知的な不協和や、現実離れした「奇妙な」感覚（センス・オブ・ワンダーとは異なる）を読者に与える。",
        books: []
      },
      {
        id: "newweird",
        title: "New Weird",
        nameJP: "ニュー・ウィアード",
        description: "ジャンルを越境する怪奇譚",
        detail: "都市ファンタジー、SF、ホラーを融合させた、2000年代以降の潮流。不気味で不可解な世界観や、身体変容などがよく描かれる。",
        books: []
      },
      {
        id: "firstcontact",
        title: "First Contact",
        nameJP: "ファーストコンタクト",
        description: "地球外知性との遭遇",
        detail: "人類と地球外知的生命体との初めての遭遇を描く。言語、文化、生物学的な違いによる意思疎通の困難さや、相互理解（あるいは対立）のプロセスがテーマ。",
        books: []
      },
      {
        id: "linguistics",
        title: "Linguistics SF",
        nameJP: "言語SF",
        description: "言葉が認識を変える",
        detail: "「サピア＝ウォーフの仮説」など、言語学的な理論をテーマの中核に据えるSF。未知の言語の解読や、言語習得による認識の変容を描く。",
        books: []
      }
    ]
  }
];
