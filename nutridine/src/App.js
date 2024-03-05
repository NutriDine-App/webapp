import React, { useState, useEffect } from "react";
import "./App.css";
import TetrisLoader from "./screens/loading/TetrisLoader";
import MacroPage from "./screens/macro/MacroPage";
import FoodCard from "./components/FoodCard";
import Layout from "./Layout";

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
      <MacroPage />
      {/* <FoodCard /> */}
    </Layout>
  );
}

export default App;
