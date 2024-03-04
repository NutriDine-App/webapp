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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledDown = window.scrollY > 50;
      setHasScrolled(scrolledDown);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const { colorMode, toggleColorMode } = useColorMode();

  const bgColorDefault = useColorModeValue("white", "gray.800");
  const bgColorScrolled = useColorModeValue("#bbbbbb", "#252E3E");

  const bgColor = hasScrolled ? bgColorScrolled : bgColorDefault;

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "flex" }}
      flexBasis={{ base: "100%", md: "auto" }}
      position={{ base: "fixed", md: "relative" }}
      width={{ base: "100vw", md: "auto" }}
      height={{ base: "100vh", md: "auto" }}
      bg={bgColor}
      zIndex={20}
      top={0}
      left={0}
      right={0}
      transition="0.3s ease"
      pt={{ base: "15rem", md: "0" }}
      borderRadius={25}
    >
      <Stack
        spacing={[12, 20]}
        align="center"
        justify={{ base: "center", md: "center" }}
        direction={{ base: "column", md: "row" }}
        pt={[4, 4, 0, 0]}
        p={[0, 0, 2, 2]}
        style={{
          transition: "background-color 1.5s",
        }}
      >
        <MenuItem
          isActive={activeItem === "/"}
          onClick={onItemSelect("/")}
          to={"/"}
        >
          Home
        </MenuItem>
        <MenuItem
          isActive={activeItem === "/restaurants"}
          onClick={onItemSelect("/restaurants")}
          to={"/restaurants"}
        >
          Restaurants
        </MenuItem>
        <MenuItem
          isActive={activeItem === "/macro"}
          onClick={onItemSelect("/macro")}
          to={"/macro"}
        >
          Macro
        </MenuItem>
        <Box>
          <Button
            onClick={toggleColorMode}
            variant="ghost"
            _hover={{
              bg: "transparent",
            }}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
