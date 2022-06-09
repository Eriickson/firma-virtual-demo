import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IndexPage } from "../src/pages/index/home";
import { useIndexContext } from "../src/pages/index/home/.context";

const withProtectedRoutes = (Component: any) => {
  const CustomComponent = (props: any) => {
    const { push } = useRouter();
    const [isSSR, setIsSSR] = useState(true);

    const { currentUser } = useIndexContext();

    useEffect(() => {
      setIsSSR(false);
    }, []);

    if (!isSSR && !currentUser) {
      push("/signin");
      return <></>;
    }

    return <Component {...props} />;
  };

  return CustomComponent;
};

export default withProtectedRoutes(IndexPage);
