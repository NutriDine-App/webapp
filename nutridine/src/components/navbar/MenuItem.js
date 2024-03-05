import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const MenuItem = ({ children, onClick, to, isActive, ...rest }) => {
  const activeBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const transitionDuration = "0.3s";

  return (
    <NavLink
      to={to}
      style={{
        display: "inline-flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        as="button"
        onClick={onClick}
        px={6}
        py={2}
        borderRadius="full"
        bg={isActive ? activeBg : "transparent"}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        transition={`background-color ${transitionDuration} ease-in-out`}
        height="40px"
        minWidth="40px"
        {...rest}
      >
        <Text>{children}</Text>
      </Box>
    </NavLink>
  );
};


