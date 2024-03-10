import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4">
    <Button leftIcon={<FaGoogle />} flexGrow={1}>
      Google
    </Button>
    <Button leftIcon={<FaTwitter />} flexGrow={1}>
      Twitter
    </Button>
    <Button leftIcon={<FaGithub />} flexGrow={1}>
      GitHub
    </Button>
  </ButtonGroup>
);
