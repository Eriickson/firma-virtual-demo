import React, { useState } from "react";

import Cookies from "universal-cookie";
import store from "store";
import { VStack } from "@chakra-ui/react";

import { instanceAxios } from "../../../settings";
import { SignInForm, SignInFormTypes } from "./SignInForm";

const cookies = new Cookies();

export const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: SignInFormTypes) {
    setIsLoading(true);
    try {
      const response = await instanceAxios.post("/logindata", values);

      console.log(response);

      if (response.data.status === "success") {
        const { Authorization, ...user } = response.data.message;

        cookies.set("token", Authorization.split(" ")[1], { path: "/" });
        store.set("user", user);
        window.location.href = "/";
      } else if (response.data.status === "fail") {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <VStack justifyContent="center" h="100vh" w="100vw">
      <SignInForm isLoading={isLoading} onSubmit={handleSubmit} />
    </VStack>
  );
};
