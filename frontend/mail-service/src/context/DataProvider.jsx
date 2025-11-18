import { createContext, useContext, useState } from "react";
import { getStartup } from "../utils/api/requests";
import { useCallback } from "react";
import { useEffect } from "react";

const DataContext = createContext();

export default function DataProvider({ children }) {
  const startupAddress = localStorage.getItem("currentStartup");
  const [state, setState] = useState({
    startup: null,
    error: null,
  });

  const setField = useCallback((field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const fetchStartup = useCallback(async () => {
    if (!localStorage.getItem("auth")) return;

    if (!startupAddress) {
      setField("startup", null);
      setField("error", null);
    }

    setField("error", null);

    try {
      const startup = await getStartup(
        localStorage.getItem("currentStartup"),
        localStorage.getItem("confidentContractId"),
      );

      setField("startup", startup);
    } catch (err) {
      setField("error", err.message || "Ошибка загрузки данных стартапа");
      console.error("Failed to fetch startup: ", err);
    }
  }, [startupAddress, setField]);

  useEffect(() => {
    fetchStartup();
  }, [fetchStartup]);

  return (
    <DataContext.Provider value={{ ...state, fetchStartup }}>
      {children}
    </DataContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export const useData = () => useContext(DataContext);
