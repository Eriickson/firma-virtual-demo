import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CustomPage404 = () => {
  const { push } = useRouter();

  useEffect(() => {
    push("/");
  }, []);

  return null;
};

export default CustomPage404;
