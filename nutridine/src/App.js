import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Image } from "@chakra-ui/react";
import nutritionIx_credit from "./images/nutritionIx_credit.png";
import TetrisLoader from "./screens/loading/TetrisLoader";
import NavBar from "./components/navbar/Navbar";
import FoodCard from "./components/FoodCard";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4500);
  }, []);

  if (isLoading) {
    return <TetrisLoader />;
  }

  return (
    <>
      <NavBar />
      <FoodCard />
      <Box bg="white">
        <Image maxH="50px" src={nutritionIx_credit} />
      </Box>
    </>
  );
}

export default App;
