import { createContext, useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api/requests";

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [employees, setEmployees] = useState([])
  
  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    try {
      const users = await getUsers(localStorage.getItem("confidentContractId"))
      setUsers(users)

      const employees = users?.filter(user => user.userRole == "POST_OFFICE_EMPLOYEE")
      setEmployees(employees)

      const userLogin = localStorage.getItem("login").split(" ").slice(-1).join("")
      setUser(users.find(user => user.surname == userLogin))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DataContext.Provider value={{ user, users, employees }}>
      {children}
    </DataContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export const useData = () => useContext(DataContext);
