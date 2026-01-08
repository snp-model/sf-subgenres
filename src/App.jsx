import React, { useState } from "react";
import Layout from "./components/Layout/Layout";
import BentoGrid from "./components/Features/BentoGrid";
import DetailPanel from "./components/Features/DetailPanel";
import { subgenres } from "./data/sampleData";

function App() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const handleClosePanel = () => {
    setSelectedGenre(null);
  };

  return (
    <Layout>
      <BentoGrid subgenres={subgenres} onGenreSelect={handleGenreSelect} />

      <DetailPanel
        genre={selectedGenre}
        isOpen={!!selectedGenre}
        onClose={handleClosePanel}
      />
    </Layout>
  );
}

export default App;
