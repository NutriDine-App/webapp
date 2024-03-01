import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export const MenuItem = ({ children, onClick, isActive, ...rest }) => {
  const activeBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const paddingSize = 2;
  const transitionDuration = "0.3s";

  return (
    <Box
      as="button"
      onClick={onClick}
      p={paddingSize}
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
  );
};
