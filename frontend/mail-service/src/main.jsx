import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import DataProvider from "./context/DataProvider.jsx"
import Profile from "./pages/Profile.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

const routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/profile", element: <Profile /> },
  { path: "/admin", element: <AdminPanel /> }
])

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <RouterProvider router={routes} />
  </DataProvider>,
);
