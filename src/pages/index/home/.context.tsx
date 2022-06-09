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
  sTipoContrato: string;
}

interface Signatory {
  num: number;
  RUT: string;
  email: string;
  full_name: string;
  phone: string;
  portion: number;
  amount: number;
  iva: number;
  notaryPay: number;
  totalPay: number;
  payment: string;
  download_draft: string;
  agree_draft: string;
  disagree_draft: string;
}
interface ContractDetail {
  contrato: Contract;
  firmantes: Signatory[];
}

interface IndexContext {
  contracts: Contract[];
  contractOwner: Contract[];
  contractDetail: ContractDetail;
  currentUser: User | undefined;
  isAuth: boolean;
  getContactOwner(): void;
  getAllContacts(): void;
  getContract(contractId: string): void;
  logOut(): void;
}

const IndexContext = createContext<IndexContext | null>(null) as Context<IndexContext>;

const cookies = new Cookies();

const IndexProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser] = useState<User | undefined>(store.get("user"));
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [contractOwner, setContractOwner] = useState<Contract[]>([]);
  const isAuth = useMemo(() => Boolean(currentUser), [currentUser]);
  const [contractDetail, setContractDetail] = useState({ firmantes: [], contrato: {} as ContractDetail["contrato"] });

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
  async function getContactOwner() {
    try {
      const { userId } = store.get("user");
      const response = await instanceAxios(`/api/v1/contract/owner/${userId}`);

      if (response.data.status === "success") {
        setContractOwner(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getContract(contractId: string) {
    try {
      const response = await instanceAxios(`/api/v1/contract/detail/${contractId}`);

      if (response.data.status === "success") {
        setContractDetail(response.data.message);
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
    <IndexContext.Provider
      value={{
        contracts,
        currentUser,
        isAuth,
        contractOwner,
        contractDetail,
        getAllContacts,
        getContactOwner,
        getContract,
        logOut,
      }}
    >
      {children}
    </IndexContext.Provider>
  );
};

const useIndexContext = () => useContext(IndexContext);

export { useIndexContext, IndexProvider };
