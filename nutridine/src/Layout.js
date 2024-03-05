import React from "react";
import { Flex } from "@chakra-ui/react";
import NavBar from "./components/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Flex
        as="main"
        pt={"8rem"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
        fontFamily={"navbar"}
      >
        {children}
      </Flex>
    </>
  );
};

export default Layout;
