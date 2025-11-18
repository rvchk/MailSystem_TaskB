import { useState } from "react";
import LoginModal from "../components/forms/LoginModal";
import FetchAccounts from "../components/FetchAccounts";
import { useData } from "../utils/DataProvider";
import StartupRequests from "../components/requests/StartupRequests";
import { Alert, Button } from "react-bootstrap";
import FundTransferModal from "../components/forms/FundTransferModal";

function ManagementDepartment() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { startup, error } = useData();

  if (!isLoggedIn) {
    return (
      <div className="text-center py-5">
        <h2>Отдел управления</h2>
        <p className="text-muted mb-4">
          Для доступа к управлению запросами требуется авторизация
        </p>
        <LoginModal onLoginSuccess={() => setIsLoggedIn(true)} />
      </div>
    );
  } else
    return (
      <div>
        <h2>Отдел управления - Запросы</h2>
        <StartupRequests startup={startup} />

        <h2 className="mt-5">Выдача средств отделу</h2>
        <Button variant="dark" onClick={() => setShowModal(true)}>
          Выдать средства отделу
        </Button>
        <FundTransferModal
          startup={startup}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
        {error && <Alert variant="danger">{error}</Alert>}
        <FetchAccounts />
      </div>
    );
}

export default ManagementDepartment;
