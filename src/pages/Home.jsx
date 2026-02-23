import React from "react";
import BentoGrid from "../components/Features/BentoGrid";
import { subgenres } from "../data/subgenres";
import { useNavigate } from "react-router-dom";
import MetaTags from "../components/SEO/MetaTags";

const Home = () => {
  const navigate = useNavigate();

  const handleGenreSelect = (genre) => {
    navigate(`/genre/${genre.id}`);
  };

  return (
    <>
      <MetaTags 
        title="SF サブジャンル総まとめ"
        description="SFの多様なサブジャンルを体系的に解説し、ジャンルごとのおすすめ作家・名作小説を紹介します。ハードSF、サイバーパンク、ディストピアなど、あなたに合ったSF作品が見つかるガイドマップです。"
      />
      <BentoGrid subgenres={subgenres} onGenreSelect={handleGenreSelect} />
    </>
  );
};

export default Home;
