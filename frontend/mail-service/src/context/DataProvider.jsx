import { createContext, useContext } from "react";
import { getUsers } from "../utils/api/requests";

const DataContext = createContext();

export default function DataProvider({ children }) {

  const getUser = async () => {
    const users = await getUsers(localStorage.getItem("confidentContractId"))
    const userLogin = localStorage.getItem("login").split(" ").slice(-1).join("")
    return users.find(user => user.surname == userLogin)
  }

  return (
    <DataContext.Provider value={{ getUser }}>
      {children}
    </DataContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export const useData = () => useContext(DataContext);
