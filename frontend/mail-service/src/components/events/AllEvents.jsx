import { Table } from "react-bootstrap";

export default function AllEvents({ events }) {
  const shortValue = (value) => {
    value = String(value);
    if (value.length > 22) {
      return value.slice(0, 22) + "...";
    } else return value;
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {/* Create headers from the keys of the first event (if events exist) */}
          {events &&
            events.length > 0 &&
            Object.entries(events[0])
              .filter(([key]) => isNaN(Number(key))) // Filter out numeric keys
              .map(([key]) => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        {/* Map through each event to create a row */}
        {events &&
          events.map((event, index) => (
            <tr key={index}>
              {/* Map through the event's entries to create cells */}
              {Object.entries(event)
                .filter(([key]) => isNaN(Number(key))) // Filter out numeric keys
                .map(([key, value]) => (
                  <td key={`${index}-${key}`}>
                    {shortValue ? shortValue(value) : String(value)}
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
