import React from "react";
import { Box, LinkBox, Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const MenuItem = ({
  children,
  onClick,
  closeMenu,
  to,
  isActive,
  ...rest
}) => {
  const activeBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const buttonBgHover = useColorModeValue(
    "light.primary.200",
    "dark.primary.400"
  );
  const transitionDuration = "0.3s";

  return (
    <LinkBox
      onClick={closeMenu}
      as="article"
      _hover={{
        background: buttonBgHover,
        borderRadius: "17",
      }}
      bg={isActive ? activeBg : "transparent"}
      borderRadius="17"
      transition={`background-color ${transitionDuration} ease-in-out`}
    >
      <NavLink
        to={to}
        style={{
          display: "block",
          width: "100%",
        }}
      >
        <Box
          as="button"
          onClick={onClick}
          px={6}
          py={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="40px"
          minWidth="40px"
          width="100%"
          {...rest}
        >
          <Text fontSize={"1.1rem"}>{children}</Text>
        </Box>
      </NavLink>
    </LinkBox>
  );
};
