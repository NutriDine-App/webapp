import React from "react";
import { Box } from "@chakra-ui/react";
import NavBar from "./components/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box as="main" pt={"8rem"}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
