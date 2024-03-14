import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
const ProfilePage = () => {
  const [displayName, setDisplayName] = useState("");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser !== null) {
      setDisplayName(currentUser.displayName);
    }
  }, [currentUser]);

  return (
    <Container maxW="lg" py={12}>
      <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="base">
        <Heading as="h2" size="xl" mb={4}>
          Profile Page
        </Heading>
        {displayName ? (
          <Text fontSize="lg">Welcome, {displayName}!</Text>
        ) : (
          <Text fontSize="lg">Welcome, user!</Text>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
