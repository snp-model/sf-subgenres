import React from "react";
import { subgenreLinkMap } from "../../utils/SubgenreLinks";

/**
 * テキスト内のサブジャンル名を検出してクリック可能なリンクに変換するコンポーネント
 *
 * @param {string} text - 処理するテキスト
 * @param {function} onLinkClick - リンクがクリックされた時のコールバック関数。引数はsubgenreId
 */
const LinkedText = ({ text, onLinkClick }) => {
  if (!text) return null;

  // サブジャンル名のリストを取得（長い名前から順にソート - 部分マッチを避けるため）
  const subgenreNames = Object.keys(subgenreLinkMap).sort(
    (a, b) => b.length - a.length
  );

  // テキストをパースして、サブジャンル名を検出
  const parts = [];
  let remainingText = text;
  let currentIndex = 0;

  while (remainingText.length > 0) {
    let foundMatch = false;

    // 各サブジャンル名を検索
    for (const name of subgenreNames) {
      const index = remainingText.indexOf(name);

      if (index === 0) {
        // マッチが見つかった場合
        const subgenreId = subgenreLinkMap[name];
        parts.push({
          type: "link",
          text: name,
          subgenreId: subgenreId,
          key: `link-${currentIndex}`,
        });

        remainingText = remainingText.slice(name.length);
        currentIndex += name.length;
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      // マッチが見つからない場合、次の文字まで通常テキストとして追加
      let nextMatchIndex = remainingText.length;

      for (const name of subgenreNames) {
        const index = remainingText.indexOf(name);
        if (index > 0 && index < nextMatchIndex) {
          nextMatchIndex = index;
        }
      }

      const textPart = remainingText.slice(0, nextMatchIndex);
      parts.push({
        type: "text",
        text: textPart,
        key: `text-${currentIndex}`,
      });

      remainingText = remainingText.slice(nextMatchIndex);
      currentIndex += nextMatchIndex;
    }
  }

  // パーツをレンダリング
  return (
    <>
      {parts.map((part) => {
        if (part.type === "link") {
          return (
            <span
              key={part.key}
              className="subgenre-link"
              onClick={(e) => {
                e.stopPropagation();
                onLinkClick(part.subgenreId);
              }}
            >
              {part.text}
            </span>
          );
        } else {
          return <React.Fragment key={part.key}>{part.text}</React.Fragment>;
        }
      })}
    </>
  );
};

export default LinkedText;
