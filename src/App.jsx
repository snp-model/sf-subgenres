import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import GenreDetail from "./pages/GenreDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:id" element={<>
          <Home />
          <GenreDetail />
        </>} />
      </Routes>
    </Layout>
  );
}

export default App;
