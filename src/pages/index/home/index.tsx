import React, { useEffect } from "react";
import { useIndexContext } from "./.context";

export const IndexPage = () => {
  const { getAllContacts } = useIndexContext();

  useEffect(() => {
    getAllContacts();
  }, []);

  return <div>IndexPage</div>;
};
