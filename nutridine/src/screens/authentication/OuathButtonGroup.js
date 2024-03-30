import React from "react";
import { ButtonGroup, Button, useToast } from "@chakra-ui/react";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../hooks/AuthService/authService";
import { useNavigate } from "react-router-dom";

export const OAuthButtonGroup = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <ButtonGroup variant="outline" spacing="4">
      <Button
        onClick={handleGoogleSignIn}
        tabIndex={-1}
        leftIcon={<FaGoogle />}
        flexGrow={1}
      >
        Google
      </Button>
      <Button tabIndex={-1} leftIcon={<FaTwitter />} flexGrow={1}>
        Twitter
      </Button>
      <Button tabIndex={-1} leftIcon={<FaGithub />} flexGrow={1}>
        GitHub
      </Button>
    </ButtonGroup>
  );
};
