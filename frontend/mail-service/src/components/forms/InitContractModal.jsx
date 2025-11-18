import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { initContract } from "../../utils/api/requests/contract/initContract";

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

      const response = await fetch("http://localhost:6862/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contracts: [contractId],
        }),
      });
      const data = await response.json();

      if (!data.error) {
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
