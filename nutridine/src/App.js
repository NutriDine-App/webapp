import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { useColorMode, Button } from "@chakra-ui/react";
import TetrisLoader from "./screens/loading/TetrisLoader";

import "./App.css";


function App() {
  const { colorMode, toggleColorMode } = useColorMode();
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="temp">
            <Button onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button>
            <div>HELLLLOOO NEW NUTRIDINE</div>
            <Link to="/macro">Go to Macro Route</Link>
          </div>
        } />
        <Route path="/macro" element={<div>This is the macro page</div>} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
