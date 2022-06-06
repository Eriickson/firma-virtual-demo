import React, { FC } from "react";

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export type SignInFormTypes = {
  login: string;
  password: string;
};

interface SignInFormProps {
  isLoading: boolean;
  onSubmit: (data: SignInFormTypes) => void;
}

export const SignInForm: FC<SignInFormProps> = ({ isLoading, onSubmit }) => {
  const { register, handleSubmit } = useForm<SignInFormTypes>();

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)} action="">
      <Stack spacing={4} borderWidth="1px" p="6" minW="sm">
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            {...register("login", { required: true })}
          />
          <FormHelperText>Enter your Email</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="Password">Password</FormLabel>
          <Input
            id="Password"
            type="password"
            {...register("password", { required: true })}
          />
          <FormHelperText>Enter your Password</FormHelperText>
        </FormControl>
        <Button isLoading={isLoading} type="submit">
          Sign In
        </Button>
      </Stack>
    </chakra.form>
  );
};
