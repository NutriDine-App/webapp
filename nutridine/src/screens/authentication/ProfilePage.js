import React, { useState } from "react";
import {
  Box,
  Container,
  Button,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import NutrientPreferences from "../nutrientPreferences/NutrientPreferences";
import { getCurrentUser } from "../../hooks/AuthService/authService";

const ProfilePage = () => {
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const [showPreferences, setShowPreferences] = useState(false);

  const currentUser = getCurrentUser();
  const buttonBgHover = useColorModeValue(
    "light.primary.200",
    "dark.primary.400"
  );
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleTogglePreferences = () => {
    setShowPreferences((prev) => !prev);
  };
  const handleCancel = () => {
    setShowPreferences(false);
  };
  return (<>

    {showPreferences ? (
      <>
        <NutrientPreferences handleCancel={handleCancel} />
      </>
    ) : (
      <Container width={["100vw", "550px"]} borderColor={borderColor}>
        <Box mt={"1rem"} bg={cardBg} borderRadius="25px" boxShadow="base" px="10" py="8">
          <Box>
            <Box mb="4">
              <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
              {currentUser.displayName}
            </Box>
            <Box mb="4">
              <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
              {currentUser.email}
            </Box>
            <Button
              bg={buttonBg}
              _hover={{ bg: buttonBgHover }}
              onClick={handleTogglePreferences}
            >
              Change Preferences
            </Button>
          </Box>
        </Box>
      </Container>
    )}
  </>
  );
};

export default ProfilePage;
