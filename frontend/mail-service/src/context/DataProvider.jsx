import { createContext, useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api/requests";

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [user, setUser] = useState({})
  const [users, setUsers] = useState({})

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const users = await getUsers(localStorage.getItem("confidentContractId"))
    setUsers(users)
    const userLogin = localStorage.getItem("login").split(" ").slice(-1).join("")
    setUser(users.find(user => user.surname == userLogin))
    return users.find(user => user.surname == userLogin)
  }

  return (
    <DataContext.Provider value={{ getUser, user, users }}>
      {children}
    </DataContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export const useData = () => useContext(DataContext);
