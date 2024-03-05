import React, { useState, useEffect } from "react";
import "./App.css";
import TetrisLoader from "./screens/loading/TetrisLoader";
import MacroPage from "./screens/macro/MacroPage";
import Layout from "./Layout";
import nutritionIx_credit from "./images/nutritionIx_credit.png";
import { Image, Box } from "@chakra-ui/react";

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
      <Box
        bg="white"
        border="1px solid white"
        borderRadius={"10px"}
        p={"0.25rem 2rem"}
        m="2rem"
        boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
      >
        <Image maxH="50px" src={nutritionIx_credit} />
      </Box>
    </Layout>
  );
}

export default App;
