import React, { forwardRef, useRef } from "react";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const PasswordField = forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);

  const mergeRefs = useMergeRefs(ref, inputRef);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <FormControl isRequired isInvalid={props.isInvalid}>
      <FormLabel htmlFor="password">{props.label}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            onClick={onClickReveal}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            bg={"transparent"}
            tabIndex={-1}
          />
        </InputRightElement>
        <Input
          id="password"
          ref={mergeRefs}
          type={isOpen ? "text" : "password"}
          name="password"
          autoComplete="current-password"
          required
          border={"1px"}
          {...props}
        />
      </InputGroup>
      {props.value === "" ? (
        <FormErrorMessage>{props.label} is required.</FormErrorMessage>
      ) : (
        <FormHelperText>Enter your password</FormHelperText>
      )}
    </FormControl>
  );
});

PasswordField.displayName = "PasswordField";

export default PasswordField;
