import React from "react";
import { Flex } from "@chakra-ui/react";
import NavBar from "./components/navbar/Navbar";
import { Image } from "@chakra-ui/react";
import nutritionIx_credit from "./assets/images/nutritionIx_credit.png";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Flex
        as="main"
        pt={["4rem", "4rem", "8rem", "8rem"]}
        justifyContent={"center"}
        fontFamily={"navbar"}
      >
        {children}
      </Flex>
      <Image maxH="50px" src={nutritionIx_credit} />
    </>
  );
};

export default Layout;
