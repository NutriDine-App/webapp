import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4">
    <Button tabIndex={-1} leftIcon={<FaGoogle />} flexGrow={1}>
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
