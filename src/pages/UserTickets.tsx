import { useEffect, useState } from "react";
import { Container, Title, Stack, Card, Text, Button, Group, Notification } from "@mantine/core";
import api from '../api/api';
import { ITicket } from '../Interfaces/ITicket';

export const UserTickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const response = await api.Tickets.getTicketsByUserId(userId);

      // Ha JSON.NET-es válasz, a jegyek a $values mezőben vannak
      const data = response.data?.$values ?? response.data;
      if (Array.isArray(data)) {
        setTickets(data);
      } else {
        setError("Váratlan válaszformátum");
        console.error("Váratlan válasz:", response.data);
      }
    } catch (err) {
      console.error("Jegyek lekérése sikertelen:", err);
      setError("Jegyek lekérése sikertelen");
    }
  };

  const deleteTicket = async (ticketId: number) => {
    try {
      await api.Tickets.deleteTicket(ticketId);
      await fetchTickets(); // frissítés törlés után
    } catch (err) {
      console.error("Hiba a jegy törlésekor:", err);
      setError("Hiba történt a jegy törlése közben");
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
  try {
    const userId = Number(localStorage.getItem("userId"));
    console.log("Jegyek lekérése a userId alapján:", userId); // 👈

    const response = await api.Tickets.getTicketsByUserId(userId);

    const data = response.data?.$values ?? response.data;
    if (Array.isArray(data)) {
      setTickets(data);
    } else {
      setError("Váratlan válaszformátum");
      console.error("Váratlan válasz:", response.data);
    }
  } catch (err) {
    console.error("Jegyek lekérése sikertelen:", err);
    setError("Jegyek lekérése sikertelen");
  }
};

  }, []);

  return (
    <Container>
      <Title order={2} mb="md">Jegyeim</Title>

      {error && (
        <Notification color="red" mb="md">
          {error}
        </Notification>
      )}

      <Stack>
        {tickets.length === 0 && (
          <Text>Nincs még jegyed.</Text>
        )}

        {tickets.map(ticket => (
          <Card key={ticket.id} shadow="sm" padding="lg">
            <Stack spacing="xs">
              <Text><strong>Vetítés ID:</strong> {ticket.screeningId}</Text>
              <Text><strong>Ár:</strong> {ticket.price} Ft</Text>
              <Text>
                <strong>Vásárlás dátuma:</strong>{" "}
                {new Date(ticket.dateOfPurchase).toLocaleDateString("hu-HU")}
              </Text>
              <Group >
                <Button
                  color="red"
                  size="xs"
                  onClick={() => deleteTicket(ticket.id)}
                >
                  Törlés
                </Button>
              </Group>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default UserTickets;
