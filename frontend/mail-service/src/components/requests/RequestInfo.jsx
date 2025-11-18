import { Card } from "react-bootstrap";

export default function RequestInfo({ request }) {
  const status = { approve: "Принят", pending: "На рассмотрении" };

  return (
    <div>
      <Card.Title>{request.type}</Card.Title>
      <Card.Text>
        <strong>Сумма:</strong> {request.amount} USD
        <br />
        <strong>Департамент:</strong>{" "}
        {/* {departments.find((dept) => dept.value === request.department).label} */}
        <br />
        <strong>Причина:</strong>{" "}
        {request.purpose == "realise" ? "Реализовать" : "getFunding"}
        <br />
        <strong>Статус: </strong> {status[request.status] || "Отклонен"}
      </Card.Text>
    </div>
  );
}
