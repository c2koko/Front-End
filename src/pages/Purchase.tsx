import { Card, Text, Alert, Button, Loader } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';
import { IScreening } from '../Interfaces/IScreening';
import { ITicketCreateDto } from '../Interfaces/ITicket';

// Átadott state: movieId, screeningId, seats
interface PurchaseState {
  movieId: number;
  screeningId: number;
  seats: number[];
}

const Purchase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PurchaseState | undefined;

  const movieId = state?.movieId;
  const screeningId = state?.screeningId;
  const pricePerSeat = 1500;

  const [seatNumbers, setSeatNumbers] = useState<number[]>([]);
  const [screening, setScreening] = useState<IScreening | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helyes state ellenőrzés
  useEffect(() => {
    if (state === undefined) return; // még nem jött meg
    if (!state.seats || state.seats.length === 0) {
      navigate('/app/seats');
    }
  }, [state, navigate]);

  useEffect(() => {
    if (state?.seats && Array.isArray(state.seats)) {
      const calculated = state.seats.map(id => id % 100); // szék szám kiszedése
      setSeatNumbers(calculated);
    }
  }, [state]);

  // Vetítés lekérése screeningId alapján (pontos lekérés, nem listából szűrve!)
  useEffect(() => {
    if (!screeningId) return;
    api.Screenings.getScreeningById(screeningId)
      .then(res => {
        console.log('Lekért vetítés:', res.data);
        setScreening(res.data);
      })
      .catch(err => {
        console.error('Vetítés lekérése sikertelen:', err);
        setError('Vetítés betöltése sikertelen.');
      })
      .finally(() => setLoading(false));
  }, [screeningId]);
  console.log("api.Ticket:", api.Tickets);

//   const handlePayment = async () => {
//   if (!screening || !state) return;
//   setPaymentLoading(true);
//   setError(null);

//   const now = new Date().toISOString();

//   const dto: ITicketCreateDto = {
//     dateOfPurchase: now,
//     price: state.seats.length * pricePerSeat,
//     ticketVerified: false,
//     screeningId: screeningId!,
//     chairs: state.seats.map(id => ({ id })) // szék ID-k átadása
//   };

//   try {
//     await api.Tickets.createTicket(dto);
//     navigate('/app');
//   } catch (err) {
//     console.error('Hiba fizetés közben:', err);
//     setError('Nem sikerült a fizetés.');
//   } finally {
//     setPaymentLoading(false);
//   }
// };

  const handlePayment = async () => {
  if (!screening || !state) return;
  setPaymentLoading(true);
  setError(null);
  console.log('Szék ID-k:', state.seats);

  const now = new Date().toISOString();
  try {
    // Jegyek létrehozása
    await Promise.all(
      state.seats.map(() => {
        const dto: ITicketCreateDto = {
          dateOfPurchase: now,
          price: pricePerSeat,
          ticketVerified: false,
          screeningId: screeningId!,
        };
        return api.Tickets.createTicket(dto);
      })
    );

    // Székek foglalásának frissítése
    await Promise.all(
      state.seats.map(seatId => api.Seats.updateReservation(seatId))
    );

    navigate('/app');
  } catch (err) {
    console.error('Hiba fizetés közben:', err);
    setError('Nem sikerült a fizetés.');
  } finally {
    setPaymentLoading(false);
  }
};

  if (loading) return <Loader />;
  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Alert
        variant="light"
        color="yellow"
        title="Az Ön által kiválasztott jegy adatai:"
        icon={<IconInfoCircle />}
      >
        <Text><strong>Film:</strong> {screening?.movie?.movieName}</Text>
        <Text>
          <strong>Időpont:</strong>{' '}
          {new Date(screening.screeningStartTime).toLocaleString('hu-HU')}
        </Text>
        <Text><strong>Terem:</strong> {screening.roomId}</Text>
        <Text><strong>Székek:</strong> {seatNumbers.join(', ')}</Text>
        <Text><strong>Ár összesen:</strong> {seatNumbers.length * pricePerSeat} Ft</Text>
      </Alert>

      <Button
        fullWidth
        mt="md"
        loading={paymentLoading}
        onClick={handlePayment}
      >
        Fizetés
      </Button>
    </Card>
  );
};

export default Purchase;
