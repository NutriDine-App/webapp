import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast({
          title: "Password reset email sent.",
          description: "Check your email to reset your password.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((error) => {
        toast({
          title: "Error sending password reset email.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Container
      w={{ base: "100%", sm: "lg" }}
      py={{ base: "12", sm: "16" }}
      px={{ base: "4", sm: "8" }}
      borderRadius={25}
    >
      <Heading
        as="h1"
        size={{ base: "xs", md: "md" }}
        textAlign="center"
        mb={6}
      >
        Reset Your Password
      </Heading>
      <Box
        p="8"
        bg={cardBg}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: 15, sm: 20 }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={["4", "8"]}>
            <FormControl isRequired>
              <FormLabel mb={4}>Email address</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                mb={2}
                border={"1px"}
              />
            </FormControl>
            <Button
              type="submit"
              bg={buttonBg}
              color="white"
              _hover={{ bg: "blue.500" }}
              mb={4}
            >
              Send Reset Email
            </Button>
            <Text textAlign="center">
              Remember your password?{" "}
              <Button
                variant="link"
                color="teal.500"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default PasswordReset;
