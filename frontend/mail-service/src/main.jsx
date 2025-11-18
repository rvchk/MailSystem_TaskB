import { createRoot } from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import DataProvider from "./context/DataProvider.jsx"
import Profile from "./pages/Profile.jsx";

const routes = [
  { path: "/", component: App },
  { path: "profile", component: Profile }
];

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} Component={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  </DataProvider>,
);
