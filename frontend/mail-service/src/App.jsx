import { useEffect, useState } from "react";
import FetchAccounts from "./components/FetchAccounts";
import { Link } from "react-router-dom";
import AuthModal from "./components/forms/AuthModal";
import { Button } from "react-bootstrap";
import CreateRequestModal from "./components/forms/CreateRequestModal";
import InitContractModal from "./components/forms/InitContractModal";

function App() {
  const [modals, setModals] = useState({
    initContract: false,
    auth: false,
    request: false,
  });

  useEffect(() => {
    const contractId = localStorage.getItem("confidentContractId");
    if (!contractId) {
      setModals((prev) => ({ ...prev, initContract: true }));
    }

    const status = localStorage.getItem("auth");
    if (!status) {
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
        <Link className="routeLink" to="/profile">
          Профиль
        </Link>
        <Button className="routeLink" onClick={() => openModal("request")}>
          Создать требования
        </Button>
        <Link className="routeLink" to="/control">
          Отдел управления
        </Link>
        <Link className="routeLink" to="/events">
          Все события
        </Link>
      </div>
      <p>Изменение аккаунтов происходит через МетаМаск</p>
      <FetchAccounts />
      <AuthModal
        show={modals.auth && !modals.initContract}
        onHide={() => closeModal("auth")}
      />
      <InitContractModal
        show={modals.initContract}
        onHide={() => closeModal("initContract")}
      />
      <CreateRequestModal
        show={modals.request}
        onHide={() => closeModal("request")}
      />
    </div>
  );
}

export default App;
