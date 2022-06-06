import { useState, Context, createContext, FC, ReactNode, useContext } from "react";
import { instanceAxios } from "../../../settings";

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
  getAllContacts(): void;
}

const IndexContext = createContext<IndexContext | null>(null) as Context<IndexContext>;

const IndexProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [contracts, setContracts] = useState<Contract[]>([]);

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

  console.log(contracts);

  return <IndexContext.Provider value={{ contracts, getAllContacts }}>{children}</IndexContext.Provider>;
};

const useIndexContext = () => useContext(IndexContext);

export { useIndexContext, IndexProvider };
