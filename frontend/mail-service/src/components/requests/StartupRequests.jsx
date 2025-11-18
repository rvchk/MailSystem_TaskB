import { Alert } from "react-bootstrap";
import Request from "./Request";
import { useEffect, useState } from "react";
import { getRequests } from "../../utils/api/requests/management/getRequests";

export default function StartupRequests() {
  const [requests, setRequests] = useState([]);
  const contractId = localStorage.getItem("confidentContractId");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsData = await getRequests(contractId);
        setRequests(requestsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, [contractId]);

  return (
    <div>
      {requests ? (
        <div className="row g-3">
          {requests.map((request) => (
            <Request request={request} key={request.id} />
          ))}
        </div>
      ) : (
        <Alert variant="info">Нет активных запросов</Alert>
      )}
    </div>
  );
}
