import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./components/modals/AuthModal";
import { Button } from "react-bootstrap";
import InitContractModal from "./components/modals/InitContractModal";
import RegisterModal from "./components/modals/RegisterModal";

function App() {
  const [modals, setModals] = useState({
    initContract: false,
    auth: false,
    register: false
  });

  useEffect(() => {
    const contractId = localStorage.getItem("confidentContractId");
    if (!contractId) {
      setModals((prev) => ({ ...prev, initContract: true }));
    }

    const login = localStorage.getItem("login");
    if (!login) {
      setModals((prev) => ({ ...prev, auth: true }));
    }
  }, []);

  const openModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  return (
    <div>
      <h1>Интерфейс приложения</h1>
      <div className="links">
        <Button className="routeLink" onClick={() => openModal("auth")}>
          Авторизация
        </Button>
        <Button className="routeLink" onClick={() => openModal("register")}>
          Регистрация
        </Button>
        {localStorage.getItem("login") && (
          <>
            <Link className="routeLink" to="/profile">
              Профиль
            </Link>
          </>
        )}

      </div>
      <AuthModal
        show={modals.auth && !modals.initContract}
        onHide={() => closeModal("auth")}
      />
      <RegisterModal
        show={modals.register && !modals.initContract}
        onHide={() => closeModal("register")}
      />
      <InitContractModal
        show={modals.initContract}
      />
    </div>
  );
}

export default App;
