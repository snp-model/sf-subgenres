import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailPanel from "../components/Features/DetailPanel";
import MetaTags from "../components/SEO/MetaTags";
import { subgenres } from "../data/subgenres";

const GenreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const genre = subgenres.find((g) => g.id === id);

  const handleClosePanel = () => {
    navigate("/");
  };

  const handleGenreSelect = (selectedGenre) => {
    navigate(`/genre/${selectedGenre.id}`);
  };

  if (!genre) {
    return <div style={{ color: "white", padding: "2rem" }}>Genre not found</div>;
  }

  const title = `${genre.nameJP} (${genre.title}) の名作SF小説まとめ | SF Subgenres Archive`;
  const description = genre.description || `SFのサブジャンル「${genre.nameJP}」の解説とおすすめ作品を紹介します。`;
  const url = `https://sf-subgenres.serendiproducts.dev/genre/${genre.id}`;

  return (
    <>
      <MetaTags title={title} description={description} url={url} />
      <DetailPanel
        genre={genre}
        isOpen={true}
        onClose={handleClosePanel}
        onGenreSelect={handleGenreSelect}
      />
    </>
  );
};

export default GenreDetail;
