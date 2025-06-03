

// // export default Seats;
// import { Card, Text, Button, Loader } from '@mantine/core';
// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import api from '../api/api';           // Itt van api.Seats és api.Screenings
// import { IChair } from '../Interfaces/IChair';

// const Seats = () => {
//   const { screeningId } = useParams<{ screeningId: string }>();
//   const navigate = useNavigate();

//   const [availableSeats, setAvailableSeats] = useState<number[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [movieTitle, setMovieTitle] = useState<string | null>(null); // opcionális

//   useEffect(() => {
//     if (!screeningId) {
//       console.error('screeningId nincs megadva');
//       return;
//     }
//     loadAvailableSeats(+screeningId);
//   }, [screeningId]);

// const loadAvailableSeats = async (scrId: number) => {
//   try {
//     const chairsRes = await api.Seats.getAvailableChairsForRoom(scrId);
//     console.log('RAW chairsRes:', chairsRes);                // Az egész válasz objektum
//     console.log('RAW chairsRes.data:', chairsRes.data);      // A válasz "data" property-je
//     // 1. Hibás struktúra kezelése
//     const rawData = chairsRes.data;
//     const chairs = Array.isArray(rawData) 
//         ? rawData 
//         : (rawData?.$values || []);

//     // 2. Property nevek egyeztetése (nagybetűs "Id" vs. kisbetűs "id")
//     const nums = chairs.map((c: any) => c.Id || c.id); // <-- Id vagy id

//     setAvailableSeats(nums);
//   } catch (err) {
//     console.error('Hiba:', err);
//     setAvailableSeats([]);
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleSeatClick = (chairId: number) => {
//   if (!availableSeats.includes(chairId)) return;

//   setSelectedSeats(prev =>
//     prev.includes(chairId)
//       ? prev.filter(id => id !== chairId)
//       : [...prev, chairId]
//   );
// };

//   const renderSeats = () => {
//   const seats = [];
//   for (let i = 1; i <= 100; i++) {
//     const chairId = 6000 + (i - 1);
//     const isAvailable = availableSeats.includes(chairId);
//     const isSelected = selectedSeats.includes(chairId); // <-- chairId-t használj!

//     seats.push(
//       // <Button
//       //   key={i}
//       //   w={40}
//       //   h={40}
//       //   variant="filled"
//       //   color={!isAvailable ? 'red' : isSelected ? 'green' : 'gray'}
//       //   disabled={!isAvailable}
//       //   m={4}
//       //   p={0}
//       //   onClick={() => handleSeatClick(chairId)} // <-- chairId-t adj át!
//       // >
//       //   {i}
//       // </Button>
//       <Button
//         key={i}
//         w={40}
//         h={40}
//         variant="filled"
//         color={!isAvailable ? 'red' : isSelected ? 'green' : 'gray'}
//         disabled={!isAvailable}
//         m={4}
//         p={0}
//         onClick={() => handleSeatClick(chairId)} // <-- chairId-t adj át!
//       >
//         {i}
//       </Button>
//     );
//   }
//   return seats;
// };
//   return (
//     <>
//       <Card shadow="sm" padding="lg" radius="md" withBorder>
//         <Text mb="md" fw={700}>Válasszon széket</Text>
//         {movieTitle && <Text mb="xs">Film: {movieTitle}</Text>}

//         {loading ? (
//           <Loader />
//         ) : (
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(10, 1fr)',
//               gap: '8px',
//               justifyItems: 'center',
//             }}
//           >
//             {renderSeats()}
//           </div>
//         )}

//         {selectedSeats.length > 0 && (
//     <Text mt="md">
//         Kiválasztott székek: {selectedSeats.map(id => id - 6000 + 1).join(', ')}
//     </Text>
//     )}
//       </Card>

//       <Button
//         color="blue"
//         fullWidth
//         mt="md"
//         radius="md"
//         onClick={() =>
//           navigate('/app/purchase/', {
//             state: { seats: selectedSeats, screeningId },
//           })
//         }
//       >
//         Tovább a fizetéshez
//       </Button>
//     </>
//   );
// };

// export default Seats;
import { Card, Text, Button, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';           // Itt van api.Seats és api.Screenings
import { IChair } from '../Interfaces/IChair';

const Seats = () => {
  const { screeningId } = useParams<{ screeningId: string }>();
  const navigate = useNavigate();

  const [chairs, setChairs] = useState<IChair[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [movieTitle, setMovieTitle] = useState<string | null>(null);

  useEffect(() => {
    if (!screeningId) {
      console.error('screeningId nincs megadva');
      return;
    }
    loadChairs(+screeningId);
  }, [screeningId]);

  const loadChairs = async (scrId: number) => {
    try {
      const chairsRes = await api.Seats.getAvailableChairsForRoom(scrId);
      const raw = chairsRes.data;
      const list: IChair[] = Array.isArray(raw) ? raw : (raw.$values || []);
      setChairs(list);
      // Opcionálisan: film cím betöltése
      const screeningRes = await api.Screenings.getScreeningById(scrId);
      setMovieTitle(screeningRes.data.movieTitle || null);
    } catch (err) {
      console.error('Hiba:', err);
      setChairs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (chairId: number) => {
    const chair = chairs.find(c => c.id === chairId);
    if (!chair || chair.isReserved) return;
    setSelectedSeats(prev =>
      prev.includes(chairId) ? prev.filter(id => id !== chairId) : [...prev, chairId]
    );
  };

  const renderSeats = () => {
    const grid = [];
    for (let i = 1; i <= 100; i++) {
      // pozíció index 0-99
      const pos = i - 1;
      // megkeressük a széket a listában az utolsó két jegy alapján
      const chair = chairs.find(c => c.id % 100 === pos);
      const chairId = chair?.id;
      const isReserved = chair?.isReserved ?? true;
      const isSelected = chairId ? selectedSeats.includes(chairId) : false;

      grid.push(
        <Button
          key={i}
          w={40}
          h={40}
          variant="filled"
          color={!chairId || isReserved ? 'red' : isSelected ? 'green' : 'gray'}
          disabled={!chairId || isReserved}
          m={4}
          p={0}
          onClick={() => chairId && handleSeatClick(chairId)}
        >
          {i}
        </Button>
      );
    }
    return grid;
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text mb="md" fw={700}>Válasszon széket</Text>
        {movieTitle && <Text mb="xs">Film: {movieTitle}</Text>}

        {loading ? (
          <Loader />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gap: '8px',
              justifyItems: 'center',
            }}
          >
            {renderSeats()}
          </div>
        )}

        {selectedSeats.length > 0 && (
          <Text mt="md">
            Kiválasztott székek: {selectedSeats.map(id => (id % 100) + 1).join(', ')}
          </Text>
        )}
      </Card>

      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() =>
          navigate('/app/purchase/', {
            state: { seats: selectedSeats, screeningId },
          })
        }
      >
        Tovább a fizetéshez
      </Button>
    </>
  );
};

export default Seats;