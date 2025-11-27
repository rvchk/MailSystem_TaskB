// components/ParcelCard.jsx
import { Card, Badge, Row, Col } from "react-bootstrap";

export default function ParcelCard({ parcel }) {
  const getStatusVariant = (status) => {
    const variants = {
      "CREATED": "Создано",
      "CONFIRMED": "Принято",
      "IN_TRANSIT": "В пути",
      "DELIVERED": "Отправлено",
      "RECEIVED": "Получен",
      "RETURNED": "Возвращен"
    };
    return variants[status] || "secondary";
  };

  const getTypeText = (type) => {
    const types = {
      "LETTER": "Письмо",
      "PARCEL": "Посылка",
      "PACKAGE": "Бандероль"
    };
    return types[type] || type;
  };

  const getClassText = (parcelClass) => {
    const classes = {
      "FIRST": "1 класс",
      "SECOND": "2 класс",
      "THIRD": "3 класс"
    };
    return classes[parcelClass] || parcelClass;
  };

  return (
    <Card className="parcel-card" style={{width: "60%", margin: "0 auto", marginBottom: "20px"}}>
      <div className="parcel-header">
        <div className="parcel-track">📦 {parcel.parcelTrackNumber}</div>
        <span
          className="label"
        >
          Статус: {getStatusVariant(parcel.parcelDeliveryStatus)}
        </span>
      </div>

      <div className="parcel-body">
        <div className="parcel-info">
          <div className="info-row">
            <span className="label">Тип: </span>
            <span className="value">
              {getTypeText(parcel.parcelType)} • {getClassText(parcel.parcelClass)}
            </span>
          </div>

          <div className="info-row">
            <span className="label">Вес: </span>
            <span className="value">{parcel.parcelWeight} кг</span>
          </div>

          <div className="info-row">
            <span className="label">Получатель: </span>
            <span className="value">{parcel.parcelBlockchainTo}</span>
          </div>

          <div className="info-row">
            <span className="label">Маршрут: </span>
            <span className="value">{parcel.parcelFrom} → {parcel.parcelTo}</span>
          </div>
        </div>

        <div className="parcel-meta">
          <div className="meta-item">
            <span>Стоимость: </span>
            <span>{parcel.parcelDeliveryPrice || "—"} WEST</span>
          </div>

          <div className="meta-item">
            <span className="meta-label">Срок: </span>
            <span className="meta-value">{parcel.parcelDeliveryTime} дн.</span>
          </div>
        </div>
      </div>
    </Card>
  );
}