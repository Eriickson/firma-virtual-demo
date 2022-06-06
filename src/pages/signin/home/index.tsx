import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { SignInForm, SignInFormTypes } from "./SignInForm";

export const SignInPage = () => {
  async function handleSubmit(values: SignInFormTypes) {
    console.log(values);
  }

  return (
    <VStack justifyContent="center" h="100vh" w="100vw">
      <SignInForm onSubmit={handleSubmit} />
    </VStack>
  );
};
