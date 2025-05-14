/*import { Card, Image, Text, Badge, Button, Group, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
// cálja hogy adatokból jegyeket generáljon
const Purchase = () => {

    const icon = <IconInfoCircle />;
    return (
        <>
        <Alert variant="light" color="yellow" title="Az Ön által kiválasztott jegy adatai:" icon={icon}>
          <Text>Film: Film címesafnldksaédlkfjljksdfaléjsadfjksadfj</Text>
          <Text>Időpont: 2023.10.10 15:00</Text>
          <Text>Terem: 1</Text>
          <Text>Szék: 1</Text> 
          <Text>Ár: 1.500 Ft</Text>  
        </Alert> 
        <Button fullWidth mt="md">Fizetés</Button>
      </>  
    );
    
}
// székek kilistázása ciklusban lenne
// fizetés gomb megkülönbözteti a regisztrált és nem regisztrált felhasználókat
// fizetés gomb után majd bekerülnek adatázisba a jegyek
export default Purchase;
*/






















// import { Card, Text, Alert, Button, Loader } from '@mantine/core';
// import { IconInfoCircle } from '@tabler/icons-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import { IScreening } from '../Interfaces/IScreening';
// import { ITicketCreateDto } from '../Interfaces/ITicket';


// export default function Purchase() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [screening, setScreening] = useState<IScreening | null>(null);
//   const [seatNumbers, setSeatNumbers] = useState<number[]>([]);
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   // Átadás paraméterként: seatIds és screeningId
//   const { screeningId, seatIds } = location.state || {};

//   useEffect(() => {
//   if (!screeningId) return;

//   api.Screenings.getScreeningById(screeningId)
//     .then((res) => {
//       setScreening(res.data);
//     })
//     .catch((err) => {
//       console.error("Vetítés betöltése sikertelen", err);
//     });

//   if (Array.isArray(seatIds)) {
//     // Székszámok az ID utolsó két karakteréből
//     const seatNumbersFromIds = seatIds.map((id: any) => {
//       const idNumber = typeof id === "string" ? parseInt(id) : id;
//       return idNumber % 100; // Pl. 6087 → 87
//     });
//     setSeatNumbers(seatNumbersFromIds);
//   } else {
//     setSeatNumbers([]);
//   }
// }, [screeningId, seatIds]);



  

//   const handlePayment = () => {
//     if (!screening || seatNumbers.length === 0) return;

//     setPaymentLoading(true);

//     // Simulált fizetési kérés – itt kell a valódi API hívás
//     const payload = {
//       screeningId: screening.id,
//       seatIds: seatNumbers,
//     };

//     api.Tickets.purchaseTickets(payload)
//       .then(() => {
//         setPaymentLoading(false);
//         navigate("/app"); // vissza főoldalra
//       })
//       .catch((err) => {
//         console.error("Hiba a fizetéskor:", err);
//         setPaymentLoading(false);
//       });
//   };

//   if (!screening) return <Text>Betöltés...</Text>;

//   return (
//     <Card shadow="sm" p="lg" radius="md" withBorder>
//       <Alert
//         variant="light"
//         color="yellow"
//         title="Az Ön által kiválasztott jegy adatai:"
//         icon={<IconInfoCircle />}
//       >
//         <Text><strong>Film:</strong> {screening.movie?.movieName}</Text>
//         <Text>
//           <strong>Időpont:</strong>{" "}
//           {new Date(screening.screeningStartTime).toLocaleString("hu-HU")}
//         </Text>
//         <Text><strong>Terem:</strong> {screening.roomId}</Text>
//         <Text><strong>Székek:</strong> {seatNumbers.join(", ")}</Text>
//         <Text><strong>Ár összesen:</strong> {seatNumbers.filter(n => !isNaN(n)).length * 1500} Ft</Text>

//       </Alert>

//       <Button
//         fullWidth
//         mt="md"
//         loading={paymentLoading}
//         onClick={handlePayment}
//       >
//         Fizetés
//       </Button>
//     </Card>
//   );
// }










































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

  const handlePayment = async () => {
    if (!screening || !state) return;
    setPaymentLoading(true);
    setError(null);

    const now = new Date().toISOString();
    try {
      await Promise.all(
        state.seats.map(() => {
          const dto: ITicketCreateDto = {
            dateOfPurchase: now,
            price: pricePerSeat,
            ticketVerified: false,
            screeningId: screeningId!,
          };
          return api.Ticket.createTicket(dto);
        })
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
