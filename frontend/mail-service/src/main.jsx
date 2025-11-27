import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import DataProvider from "./context/DataProvider.jsx"
import Profile from "./pages/Profile.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Employee from "./pages/Employee.jsx";
import Parcels from "./pages/Parcels.jsx";
import MoneyTransfers from "./pages/MoneyTransfers.jsx";
import { Button } from "react-bootstrap";

const routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/profile", element: <Profile /> },
  { path: "/employee", element: <Employee /> },
  { path: "/parcels", element: <Parcels /> },
  { path: "/moneyTransfers", element: <MoneyTransfers /> },
  { path: "/admin", element: <AdminPanel /> }
])

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <RouterProvider router={routes} />
    <Button className="mt-5" variant="outline-secondary">Ровчак Матвей Сергеевич | Профессионалы 2026</Button>
  </DataProvider>,
);
