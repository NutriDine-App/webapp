import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  AbsoluteCenter,
  useToast,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import PasswordField from "./PasswordField";
import { useNavigate } from "react-router-dom";
import { OAuthButtonGroup } from "./OuathButtonGroup";
import { register } from "../../hooks/AuthService/authService";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConsfirmPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState([false, false, false]);

  const cardBg = useColorModeValue("gray.50", "gray.700");
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();

    const initialInvalidStates = [false, false, false];

    const invalidStates = initialInvalidStates.map((state, index) => {
      if (index === 0 && email === "") return true;
      if (index === 1 && password === "") return true;
      if (index === 2 && confirmPassword === "") return true;
      return state;
    });

    if (password !== confirmPassword || invalidStates.includes(true)) {
      if (password !== confirmPassword) {
        toast({
          title: "Sign up Failed",
          description: "Passwords do not match. Please try again!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Sign up Failed",
          description: "Please fill in all required fields.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      setIsInvalid(invalidStates);
      return;
    }

    register(email, password)
      .then((userCredential) => {
        navigate("/register-form");
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        toast({
          title: "Sign up Failed",
          description: `Failed to create account: ${error.message}`,
          status: "error",
          duration: 8000,
          isClosable: true,
        });
      });
  };

  return (
    <Container
      maxW={{ base: "90%", sm: "lg" }}
      py={{ base: "12", md: "24" }}
      px={{ base: "4", sm: "8" }}
    >
      <FormControl onSubmit={onSubmit}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "sm", md: "md" }}>
                Create an Account
              </Heading>
            </Stack>
          </Stack>
          <Box
            p={{ base: "4", sm: "8" }}
            bg={cardBg}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: 15, sm: 20 }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isRequired isInvalid={isInvalid[0]}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    border={"1px"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {email === "" ? (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  ) : (
                    <FormHelperText>Enter your email</FormHelperText>
                  )}
                </FormControl>
                <PasswordField
                  isInvalid={isInvalid[1]}
                  label={"Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordField
                  isInvalid={isInvalid[2]}
                  label={"Confirm Password"}
                  value={confirmPassword}
                  onChange={(e) => setConsfirmPassword(e.target.value)}
                />
              </Stack>
              <Stack spacing="6">
                <Button onClick={onSubmit} type="submit" bg={buttonBg}>
                  Sign up
                </Button>
                <Text color="fg.muted">
                  Already have an account?{" "}
                  <Link
                    onClick={() => navigate("/login")}
                    color="teal.500"
                    href="#"
                  >
                    Login
                  </Link>
                </Text>
                <Box position="relative" padding="15">
                  <Divider />
                  <AbsoluteCenter bg="transparent" px="4">
                    or sign up with
                  </AbsoluteCenter>
                </Box>
                <OAuthButtonGroup></OAuthButtonGroup>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </FormControl>
    </Container>
  );
};

export default Signup;
