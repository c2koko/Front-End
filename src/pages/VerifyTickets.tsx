import { useEffect, useState } from "react";
import { Container, Title, Stack, Card, Text, Button, Group, Notification } from "@mantine/core";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { ITicket } from "../Interfaces/ITicket";

interface TicketWithUserInfo extends ITicket {
  userName?: string;
  userEmail?: string;
}

const VerifyTickets = () => {
  const { screeningId } = useParams();
  const [tickets, setTickets] = useState<TicketWithUserInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTicketsWithUserInfo = async () => {
    try {
      const res = await api.Tickets.getTicketsByScreeningId(Number(screeningId));
      const data: ITicket[] = res.data.$values;

      // Felhasználó név és email lekérése
      const ticketsWithUserData = await Promise.all(
        data.map(async (ticket) => {
          if (ticket.userId) {
            try {
              const userRes = await api.Users.getUserInfo(ticket.userId);
              return {
                ...ticket,
                userName: userRes.data.name,
                userEmail: userRes.data.email,
              };
            } catch (e) {
              console.warn(`Nem sikerült betölteni a felhasználó adatait (userId: ${ticket.userId})`);
            }
          }
          return { ...ticket };
        })
      );

      setTickets(ticketsWithUserData);
    } catch (err) {
      console.error("Jegyek lekérése sikertelen:", err);
      setError("Jegyek lekérése sikertelen");
    }
  };

  useEffect(() => {
    fetchTicketsWithUserInfo();
  }, [screeningId]);

  return (
    <Container>
      <Title order={2} mb="md">Még nem ellenőrzött jegyek</Title>

      {error && (
        <Notification color="red" mb="md">
          {error}
        </Notification>
      )}

      <Stack gap="md">
        {tickets.length === 0 ? (
          <Text>Nincs nem ellenőrzött jegy.</Text>
        ) : (
          tickets.map(ticket => (
            <Card key={ticket.id} shadow="sm" padding="lg">
              <Stack>
                <Text>
                  <strong>Vásárlás dátuma:</strong>{" "}
                  {new Date(new Date(ticket.dateOfPurchase).getTime() + 2 * 60 * 60 * 1000).toLocaleString("hu-HU")}
                </Text>
                <Text><strong>Ár:</strong> {ticket.price} Ft</Text>
                <Text><strong>Felhasználó neve:</strong> {ticket.userName ?? 'Ismeretlen'}</Text>
                <Text><strong>Email:</strong> {ticket.userEmail ?? 'Nem elérhető'}</Text>

                <Group>
                  <Button
                    color="green"
                    size="xs"
                    onClick={() => api.Tickets.verifyTicket(ticket.id, { ticketVerified: true }).then(() => {fetchTicketsWithUserInfo();})}
                  >
                    Validálás
                  </Button>
                </Group>
              </Stack>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  );
};

export default VerifyTickets;
