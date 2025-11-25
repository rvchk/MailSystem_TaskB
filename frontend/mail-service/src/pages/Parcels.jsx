import { useState } from "react";
import { Button } from "react-bootstrap";
import ChangePostIdModal from "../components/admin/ChangePostIdModal";
import RegisterEmployeeModal from "../components/admin/RegisterEmployeeModal";
import RemoveEmployeeModal from "../components/admin/RemoveEmployeeModal";

export default function Parcels() {

  const [modals, setModals] = useState({
    confirmParcel: false,
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
      <h1>Посылки</h1>
      <div className="buttons">
        <Button variant="primary" onClick={() => openModal("confirmParcel")}>
          Подтвердить посылку
        </Button>
        <Button variant="primary" onClick={() => openModal("deletion")}>
          Удалить сотрудника
        </Button>
        <Button variant="primary" onClick={() => openModal("changePost")}>
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
