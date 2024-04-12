import React from "react";
import { ButtonGroup, Button, useToast } from "@chakra-ui/react";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth } from "../../hooks/AuthService/authService";
import { useNavigate } from "react-router-dom";

export const OAuthButtonGroup = ({ isSignUp }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignIn = (Provider) => {
    const provider = new Provider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const isNewUser = result._tokenResponse?.isNewUser;
        if (isSignUp || isNewUser) {
          navigate("/register-form");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <ButtonGroup variant="outline" spacing="4">
      <Button
        onClick={() => handleSignIn(GoogleAuthProvider)}
        tabIndex={-1}
        leftIcon={<FaGoogle />}
        flexGrow={1}
        fontWeight="normal"
      >
        Google
      </Button>
      <Button
        onClick={() => handleSignIn(TwitterAuthProvider)}
        tabIndex={-1}
        leftIcon={<FaTwitter />}
        flexGrow={1}
        fontWeight="normal"
      >
        Twitter
      </Button>
      <Button
        onClick={() => handleSignIn(GithubAuthProvider)}
        tabIndex={-1}
        leftIcon={<FaGithub />}
        flexGrow={1}
        fontWeight="normal"
      >
        GitHub
      </Button>
    </ButtonGroup>
  );
};
