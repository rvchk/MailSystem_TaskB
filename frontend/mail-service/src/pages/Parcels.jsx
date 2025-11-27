import { Button } from "react-bootstrap";
import { useModal } from "../utils/hooks/useModal";
import { useData } from "../context/DataProvider";
import { postOffices } from "../utils/helpers";
import CreateParcelModal from "../components/user/CreateParcelModal";

export default function Parcels() {
  const { users } = useData()

  const { modals, openModal, closeModal } = useModal({
    confirmParcel: false,
    deletion: false,
    changePost: false,
    createParcel: false
  });

  return (
    <>
      <h1>Посылки</h1>
      <div className="buttons">
        <Button variant="primary" onClick={() => openModal("createParcel")}>
          Создать посылку
        </Button>
      </div>
      <CreateParcelModal
        show={modals.createParcel}
        onHide={() => closeModal("createParcel")}
        postOffices={postOffices}
        users={users}
      />
    </>
  );
}
