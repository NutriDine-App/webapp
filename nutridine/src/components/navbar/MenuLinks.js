import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  useColorModeValue,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { MenuItem } from "./MenuItem";

export const MenuLinks = ({ isOpen, onItemSelect, activeItem }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScrollStart = () => {
      if (!isScrolling) setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollStop, 150);
    };

    const handleScrollStop = () => {
      setIsScrolling(false);
    };

    window.addEventListener("scroll", handleScrollStart);

    return () => {
      window.removeEventListener("scroll", handleScrollStart);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  const { colorMode, toggleColorMode } = useColorMode();
  const scrolling_color = [
    "transparent",
    useColorModeValue("#bbbbbb", "#252E3E"),
  ];
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "flex" }}
      flexBasis={{ base: "100%", md: "auto" }}
      position={{ base: "fixed", md: "relative" }}
      width={{ base: "100vw", md: "auto" }}
      height={{ base: "100vh", md: "auto" }}
      bg={[useColorModeValue("white", "gray.800"), "transparent"]}
      zIndex={20}
      top={0}
      left={0}
      right={0}
      transition="0.3s ease"
      pt={{ base: "15rem", md: "0" }}
    >
      <Stack
        spacing={[12, 20]}
        align="center"
        justify={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        pt={[4, 4, 0, 0]}
        p={[0, 0, 2, 2]}
        bg={isScrolling ? "transparent" : scrolling_color}
        borderRadius={"full"}
        style={{
          transition: "background-color 1.5s",
        }}
      >
        <MenuItem isActive={activeItem === "/"} onClick={onItemSelect("/")}>
          Home
        </MenuItem>
        <MenuItem
          isActive={activeItem === "/restaurants"}
          onClick={onItemSelect("/restaurants")}
        >
          Restaurants
        </MenuItem>
        <MenuItem
          isActive={activeItem === "/macro"}
          onClick={onItemSelect("/macro")}
        >
          Macro
        </MenuItem>
        <Box>
          <Button
            onClick={toggleColorMode}
            variant="ghost"
            _hover={{
              bg: "transparent", // Keeps background transparent on hover
            }}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
