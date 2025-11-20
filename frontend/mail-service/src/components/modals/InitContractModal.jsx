import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { initContract } from "../../utils/api/initContract";
import { getContractData } from "../../utils/api/getContractData";

export default function InitContractModal({ show, onHide }) {
  const [isLoading, setLoading] = useState(false);

  const initializeContract = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      const contractId = await initContract();
      localStorage.setItem("confidentContractId", contractId);
    }, 2000);

    let myInterval = setInterval(async () => {
      const contractId = localStorage.getItem("confidentContractId");

      const contract = await getContractData(contractId)
      console.log(contract.data)

      if (!contract.data.error) {
        alert("Контракт получен!");
        clearInterval(myInterval);
        setLoading(false);
        location.reload();
      }
    }, 5000);
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Инициализация контракта</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={initializeContract}
          className="w-100"
        >
          {isLoading ? "Загрузка..." : "Инициализировать"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
