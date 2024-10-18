import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  FormHelperText,
  FormErrorMessage,
  Divider,
  Container
} from "@chakra-ui/react";

export const UserInfoCollectionForm = ({ onSubmit }) => {

  const [displayName, setDisplayName] = useState("");

  const cardBg = useColorModeValue("gray.50", "gray.700");
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const buttonHover = useColorModeValue(
    "light.primary.400",
    "dark.primary.400"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Container centerContent>
      <Box
        p={{ base: "4", sm: "8" }}
        bg={cardBg}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: 15, sm: 20 }}
        width={{ base: "100%", sm: "400px" }}
      >
        <Text fontSize={{ base: "1.25rem", md: "1.5rem" }} mb={4} textAlign="center">
          Finish Setting Up Your Account
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="displayName" isRequired>
              <FormLabel fontWeight="normal">Name</FormLabel>

              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John Doe"
              />

              <FormHelperText>
                Enter the name you'd like displayed on your profile.
              </FormHelperText>
            </FormControl>

            <Button
              type="submit"
              bg={buttonBg}
              _hover={{ bg: buttonHover }}
              fontWeight="normal"
            >
              Update Profile
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
