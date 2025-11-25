import { Button } from "react-bootstrap";
import ChangePostIdModal from "../components/admin/ChangePostIdModal";
import RegisterEmployeeModal from "../components/admin/RegisterEmployeeModal";
import RemoveEmployeeModal from "../components/admin/RemoveEmployeeModal";
import { useData } from "../context/DataProvider";
import { postOffices } from "../utils/helpers";
import { useModal } from "../utils/hooks/useModal";

export default function AdminPanel() {
  const { employees, users } = useData()

  const { modals, openModal, closeModal } = useModal({
    registration: false,
    deletion: false,
    changePost: false
  });

  return (
    <>
      <h1>Панель управления админа</h1>
      <div className="buttons">
        <Button variant="primary" onClick={() => openModal("registration")}>
          Зарегистрировать сотрудника
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
        employees={employees}
        postOffices={postOffices}
      />
      <RegisterEmployeeModal
        show={modals.registration}
        onHide={() => closeModal("registration")}
        users={users}
        postOffices={postOffices}
      />
      <RemoveEmployeeModal
        show={modals.deletion}
        onHide={() => closeModal("deletion")}
        employees={employees}
      />
    </>
  );
}
