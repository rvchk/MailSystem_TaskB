import { getEvents } from "../utils/api/requests/user/getEvents";
import FetchAccounts from "../components/FetchAccounts";
import AllEvents from "../components/events/AllEvents";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

export default function DaoActivity() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  async function getAllEvents() {
    try {
      const events = await getEvents();
      if (!events.length) {
        setError("Ивенты не происходили");
        return;
      }
      setEvents(events);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <h2>Все события в DaoSystem</h2>
      <AllEvents events={events} />
      {error && <Alert variant="danger">{error}</Alert>}
      <FetchAccounts />
    </>
  );
}
