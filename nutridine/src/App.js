import React, { useState, useEffect } from "react";
import "./App.css";
import TetrisLoader from "./screens/loading/TetrisLoader";
import MacroPage from "./screens/macro/MacroPage";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  if (isLoading) {
    return <TetrisLoader />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/restaurants" element={<div>Restaurants Page</div>} />
        <Route path="/macro" element={<MacroPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
