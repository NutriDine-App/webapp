import React, { useState, useEffect } from "react";
import "./App.css";
import { useColorMode, Text } from "@chakra-ui/react";
import TetrisLoader from "./screens/loading/TetrisLoader";
import NavBar from "./components/navbar/Navbar";

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
    </>
  );
}

export default App;
