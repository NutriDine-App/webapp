import React from "react";
import { Box } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box
      display={{ base: "block", md: "none" }}
      onClick={toggle}
      cursor="pointer"
      position="absolute"
      top="1rem"
      right="1rem"
      zIndex={25}
    >
      {isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={6} />}
    </Box>
  );
};
