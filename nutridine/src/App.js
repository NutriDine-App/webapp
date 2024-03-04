import React, { useState, useEffect } from "react";
import "./App.css";
import TetrisLoader from "./screens/loading/TetrisLoader";
import NavBar from "./components/navbar/Navbar";
import FoodCardTest from "./components/FoodDisplay/FoodCardTest";
import FoodCardList from "./components/FoodDisplay/FoodCardList";
// import FoodCard from "./components/FoodCard/FoodCard";
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
    <>
      <NavBar />
      {/* <FoodCardList /> */}
      <FoodCardTest />
      {/* <NavBar />
      <Box bg="white">
        <Image maxH="50px" src={nutritionIx_credit} />
      </Box> */}
    </>
  );
}

export default App;
