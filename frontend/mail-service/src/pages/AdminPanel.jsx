import { useState } from "react";
import { Button } from "react-bootstrap";
import ChangePostIdModal from "../components/admin/ChangePostIdModal";
import RegisterEmployeeModal from "../components/admin/RegisterEmployeeModal";
import RemoveEmployeeModal from "../components/admin/RemoveEmployeeModal";

export default function AdminPanel() {

  const [modals, setModals] = useState({
    registration: false,
    deletion: false,
    changePost: false
  });

  const openModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  return (
    <>
      <h1>Панель управления админа</h1>
      <div className="links">
        <Button className="routeLink" onClick={() => openModal("registration")}>
          Зарегистрировать сотрудника
        </Button>
        <Button className="routeLink" onClick={() => openModal("deletion")}>
          Удалить сотрудника
        </Button>
        <Button className="routeLink" onClick={() => openModal("changePost")}>
          Изменить адрес сотрудника
        </Button>
      </div>
      <ChangePostIdModal
        show={modals.changePost}
        onHide={() => closeModal("changePost")}
      />
      <RegisterEmployeeModal
        show={modals.registration}
        onHide={() => closeModal("registration")}
      />
      <RemoveEmployeeModal
        show={modals.deletion}
        onHide={() => closeModal("deletion")}
      />
    </>
  );
}
