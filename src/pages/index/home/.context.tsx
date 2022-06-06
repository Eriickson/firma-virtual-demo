import { useState, Context, createContext, FC, ReactNode, useContext, useMemo } from "react";
import store from "store";
import Cookies from "universal-cookie";

import { instanceAxios } from "../../../settings";

interface User {
  userId: number;
  firstName: string;
  lastName: string;
}

interface Contract {
  sContractID: string;
  sOwnerType: string;
  iContractTypeFeeID: number;
  sStatus: string;
  sPaymentStatus: string;
  iPaymentService: number;
  iContractOwner: number;
  dContractDT: number;
  iSignedCount: number;
}

interface IndexContext {
  contracts: Contract[];
  currentUser: User | undefined;
  isAuth: boolean;
  getAllContacts(): void;
  logOut(): void;
}

const IndexContext = createContext<IndexContext | null>(null) as Context<IndexContext>;

const cookies = new Cookies();

const IndexProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser] = useState<User | undefined>(store.get("user"));
  const [contracts, setContracts] = useState<Contract[]>([]);
  const isAuth = useMemo(() => Boolean(currentUser), [currentUser]);

  async function getAllContacts() {
    try {
      const response = await instanceAxios("/api/v1/contract");

      if (response.data.status === "success") {
        setContracts(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function logOut() {
    store.remove("user");
    cookies.remove("token");
    window.location.href = "/signin";
  }

  return (
    <IndexContext.Provider value={{ contracts, currentUser, isAuth, getAllContacts, logOut }}>
      {children}
    </IndexContext.Provider>
  );
};

const useIndexContext = () => useContext(IndexContext);

export { useIndexContext, IndexProvider };
