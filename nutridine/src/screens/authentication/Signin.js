import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  AbsoluteCenter,
  useToast,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import PasswordField from "./PasswordField";
import { useNavigate } from "react-router-dom";
import { OAuthButtonGroup } from "./OuathButtonGroup";
import { signIn } from "../../hooks/AuthService/authService";

const Signin = () => {
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState([false, false]);
  const [rememberMe, setRememberMe] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();

    const invalidStates = [email === "", password === ""];

    setIsInvalid(invalidStates);

    if (invalidStates.includes(true)) {
      return;
    }

    signIn(email, password, rememberMe)
      .then((userCredential) => {
        navigate("/");
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        toast({
          title: "Login Failed",
          description:
            "The email or password you entered is incorrect. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Container
      maxW={{ base: "90%", sm: "lg" }}
      py={{ base: "12", md: "24" }}
      px={{ base: "4", sm: "8" }}
      borderRadius={25}
    >
      <FormControl onSubmit={onLogin}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "md" }}>
                Log in to Your Account
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
              </Stack>
              <HStack justify="space-between">
                <Checkbox
                  isChecked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  defaultChecked
                  tabIndex={-1}
                >
                  Remember me
                </Checkbox>
                <Button
                  onClick={() => {
                    navigate("/reset-password");
                  }}
                  variant="link"
                  size="sm"
                  tabIndex={-1}
                >
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button onClick={onLogin} type="submit" bg={buttonBg}>
                  Sign in
                </Button>
                <Text color="fg.muted">
                  Don't have an account?{" "}
                  <Link
                    onClick={() => navigate("/signup")}
                    color="teal.500"
                    href="#"
                    tabIndex={-1}
                  >
                    Sign up
                  </Link>
                </Text>
                <Box position="relative" padding="15">
                  <Divider />
                  <AbsoluteCenter bg="transparent" px="4">
                    or continue with
                  </AbsoluteCenter>
                </Box>
                <OAuthButtonGroup isSignUp={false} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </FormControl>
    </Container>
  );
};

export default Signin;
