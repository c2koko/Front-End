// import { Card, Text, Button, Loader } from '@mantine/core';
// import { useEffect, useState } from 'react';
// import {useNavigate} from "react-router-dom";


// const Seats = () => {
//   const navigate = useNavigate();
//   const [bookedSeats, setBookedSeats] = useState<number[]>([]); // Backend által lefoglalt székek
//   const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Felhasználó által kiválasztott székek
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadBookedSeats();
//   }, []);

//   const loadBookedSeats = async () => {
//     // Példa API hívás – valós környezetben fetch vagy axios
//     // const response = await fetch('/api/seats/booked');
//     // const data = await response.json();
//     const data = [5, 17, 34, 55, 78]; // DEMO adat
//     setBookedSeats(data);
//     setLoading(false);
//   };

//   const handleSeatClick = (seatNumber: number) => {
//     if (bookedSeats.includes(seatNumber)) return; // Ne engedje a foglalt szék kiválasztását

//     setSelectedSeats((prev) =>
//       prev.includes(seatNumber)
//         ? prev.filter((n) => n !== seatNumber) // ha már kiválasztott, akkor törli
//         : [...prev, seatNumber] // különben hozzáadja
//     );
//   };

//   const renderSeats = () => {
//     const seats = [];

//     for (let i = 1; i <= 100; i++) {
//       const isBooked = bookedSeats.includes(i);
//       const isSelected = selectedSeats.includes(i);

//       seats.push(
//         <Button
//           key={i}
//           w={40}
//           h={40}
//           variant="filled"
//           color={isBooked ? 'red' : isSelected ? 'green' : 'grey'}
//           disabled={isBooked}
//           m={4}
//           p={0}
//           onClick={() => handleSeatClick(i)}
//         >
//           {i}
//         </Button>
//       );
//     }

//     return seats;
//   };

//   return (
//     <>
//     <Card shadow="sm" padding="lg" radius="md" withBorder>
//       <Text mb="md" fw={700}>Válasszon széket</Text>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(10, 1fr)',
//             gap: '8px',
//             justifyItems: 'center',
//           }}
//         >
//           {renderSeats()}
//         </div>
//       )}

      
//       {selectedSeats.length > 0 && (
//         <Text mt="md">Kiválasztott székek: {selectedSeats.join(', ')}</Text>
//       )}
//     </Card>
//     <Button color="blue" fullWidth mt="md" radius="md" onClick={() => navigate('/app/purchase')}>Tovább a fizetéshez</Button>
//     </>
//   );
// };

// export default Seats;

// import { Card, Text, Button, Loader } from '@mantine/core';
// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import api from '../api/api';           // itt van api.Seats és api.Screenings
// import { IChair } from '../Interfaces/IChair';

// const Seats = () => {
//   const { screeningId } = useParams<{ screeningId: string }>();
//   const navigate = useNavigate();

//   const [availableSeats, setAvailableSeats] = useState<number[]>([]); // backend által visszaadott szabad székek
//   const [selectedSeats, setSelectedSeats] = useState<number[]>([]);   // felhasználó által választottak
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!screeningId) { console.error('screeningid nincs megadva'); return }
//     loadAvailableSeats(+screeningId);
//   }, [screeningId]);

//   const loadAvailableSeats = async (scrId: number) => {
//     try {
//       // 1. lekérjük a vetítés részleteit, hogy megtudjuk a roomId-t
//       const scrRes = await api.Screenings.getScreening(scrId);
//       const screening = scrRes.data;
//       const roomId = screening.RoomId;

//       // 2. lekérjük az adott teremben elérhető székeket
//       const chairsRes = await api.Seats.getAvailableChairsForRoom(roomId);
//       // feltételezzük, hogy IChair-ben van egy 'number' vagy 'id' mező, ami a székszám
//       const nums = (chairsRes.data as IChair[]).map(c => c.id);
//       setAvailableSeats(nums);
//     } catch (err) {
//       console.error('Hiba a székek betöltésekor:', err);
//       setAvailableSeats([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSeatClick = (seatNumber: number) => {
//     // ha nem elérhető, ne csináljon semmit
//     if (!availableSeats.includes(seatNumber)) return;

//     setSelectedSeats(prev =>
//       prev.includes(seatNumber)
//         ? prev.filter(n => n !== seatNumber)
//         : [...prev, seatNumber]
//     );
//   };

//   const renderSeats = () => {
//     const seats = [];
//     for (let i = 1; i <= 100; i++) {
//       const isAvailable = availableSeats.includes(i);
//       const isSelected = selectedSeats.includes(i);
//       seats.push(
//         <Button
//           key={i}
//           w={40}
//           h={40}
//           variant="filled"
//           color={!isAvailable ? 'red' : isSelected ? 'green' : 'grey'}
//           disabled={!isAvailable}
//           m={4}
//           p={0}
//           onClick={() => handleSeatClick(i)}
//         >
//           {i}
//         </Button>
//       );
//     }
//     return seats;
//   };

//   return (
//     <>
//       <Card shadow="sm" padding="lg" radius="md" withBorder>
//         <Text mb="md" fw={700}>Válasszon széket</Text>
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
//           <Text mt="md">Kiválasztott székek: {selectedSeats.join(', ')}</Text>
//         )}
//       </Card>

//       <Button
//         color="blue"
//         fullWidth
//         mt="md"
//         radius="md"
//         onClick={() => navigate('/app/purchase/', { state: { seats: selectedSeats, screeningId } })}
//       >
//         Tovább a fizetéshez
//       </Button>
//     </>
//   );
// };

// export default Seats;

// import { Card, Text, Button, Loader } from '@mantine/core';
// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import api from '../api/api';
// import { IScreening } from '../Interfaces/IScreening';
// import { IChair } from '../Interfaces/IChair';

// const Seats = () => {
//   const { screeningId } = useParams<{ screeningId: string }>();
//   const navigate = useNavigate();

//   const [availableSeats, setAvailableSeats] = useState<number[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!screeningId) return;
//     loadAvailableSeats(+screeningId);
//   }, [screeningId]);

//   const loadAvailableSeats = async (scrId: number) => {
//   try {
//     const scrRes = await api.Screenings.getScreening(scrId);
//     const rawScr = scrRes.data;
//     const screening: IScreening = Array.isArray(rawScr)
//       ? rawScr[0]
//       : (rawScr as any).$values
//         ? (rawScr as any).$values[0]
//         : (rawScr as IScreening);

//     const roomId = screening.roomId;
//     if (roomId == null) throw new Error('screening.roomId is null');

//     // -- itt a változás: kezeljük, ha data nem közvetlen tömb, hanem {$values: [...]}
//     const chairsRes = await api.Seats.getAvailableChairsForRoom(roomId);
//     const rawChairs = chairsRes.data as any;
//     const chairsArray: IChair[] = Array.isArray(rawChairs)
//       ? rawChairs
//       : rawChairs.$values && Array.isArray(rawChairs.$values)
//         ? rawChairs.$values
//         : [];
//     // most már biztosan tömb
//     const nums = chairsArray.map(c => c.id); 
//     setAvailableSeats(nums);
//   } catch (err) {
//     console.error('Hiba a székek betöltésekor:', err);
//     setAvailableSeats([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleSeatClick = (n: number) => {
//     if (!availableSeats.includes(n)) return;
//     setSelectedSeats(prev =>
//       prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]
//     );
//   };

//   const renderSeats = () => {
//   const buttons = [];
//   for (let i = 1; i <= 100; i++) {
//     const isAvailable = availableSeats.includes(i);   // ezek szabadok
//     const isSelected = selectedSeats.includes(i);

//     buttons.push(
//       <Button
//         key={i}
//         w={40}
//         h={40}
//         variant="filled"
//         color={isAvailable ? 'grey' : isSelected ? 'green' : 'grey'}
//         disabled={isAvailable}          // csak az ÉLŐ (available) székek maradnak engedélyezve
//         m={4}
//         p={0}
//         onClick={() => handleSeatClick(i)}
//       >
//         {i}
//       </Button>
//     );
//   }
//   return buttons;
// };

//   return (
//     <>
//       <Card shadow="sm" padding="lg" radius="md" withBorder>
//         <Text mb="md" fw={700}>Válasszon széket</Text>
//         {loading ? (
//           <Loader />
//         ) : (
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(10, 1fr)',
//             gap: 8,
//             justifyItems: 'center'
//           }}>
//             {renderSeats()}
//           </div>
//         )}
//         {selectedSeats.length > 0 && (
//           <Text mt="md">Kiválasztott székek: {selectedSeats.join(', ')}</Text>
//         )}
//       </Card>

//       <Button
//         color="blue"
//         fullWidth
//         mt="md"
//         radius="md"
//         onClick={() =>
//           navigate('/app/purchase/', {
//             state: { screeningId, seats: selectedSeats }
//           })
//         }
//       >
//         Tovább a fizetéshez
//       </Button>
//     </>
//   );
// };

// export default Seats;

// src/pages/Seats.tsx
// import { Card, Text, Button, Loader } from '@mantine/core';
// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import api from '../api/api';
// import { IScreening } from '../Interfaces/IScreening';
// import { IChair } from '../Interfaces/IChair';

// const Seats = () => {
//   const { screeningId } = useParams<{ screeningId: string }>();
//   const navigate = useNavigate();

//   const [availableSeats, setAvailableSeats] = useState<number[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!screeningId) {console.log('nem kapja meg a httpcímből a screeningid-t'); return;}
//     loadAvailableSeats(+screeningId); console.log('screeningId:', screeningId);
//   }, [screeningId]);

//   const loadAvailableSeats = async (scrId: number) => {
//     try {
//       // 1) lekérjük a vetítést, hogy megkapjuk a roomId-t
//       const scrRes = await api.Screenings.getScreening(screeningId?);
//       const raw = scrRes.data;
//       const screening: IScreening = Array.isArray(raw)
//         ? raw[0]
//         : (raw as any).$values
//           ? (raw as any).$values[0]
//           : (raw as IScreening);

//        const roomId = screening?.id; // room id valóbal a screeningnek id-je
//        if (roomId == null) throw new Error('screening.screeningid is null');

//       // 2) lekérjük az adott terem elérhető (isReserved = false) székeket
//       const chairsRes = await api.Seats.getAvailableChairsForRoom(roomId);
//       const rawChairs = chairsRes.data as any;
//       const chairsArray: IChair[] = Array.isArray(rawChairs)
//         ? rawChairs
//         : rawChairs.$values && Array.isArray(rawChairs.$values)
//           ? rawChairs.$values
//           : [];

//       // Az availableSeats csak a szabad székek ID-it tartalmazza
//       const nums = chairsArray.map(c => c.id);
//       setAvailableSeats(nums);
//     } catch (err) {
//       console.error('Hiba a székek betöltésekor:', err);
//       setAvailableSeats([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSeatClick = (n: number) => {
//     if (!availableSeats.includes(n)) return;           // csak elérhetőn kattintható
//     setSelectedSeats(prev =>
//       prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]
//     );
//   };

//   const renderSeats = () => {
//     const buttons = [];
//     for (let i = 1; i <= 100; i++) {
//       const isAvailable = availableSeats.includes(i);  // ezek szabadok
//       const isSelected = selectedSeats.includes(i);
//       buttons.push(
//         <Button
//           key={i}
//           w={40}
//           h={40}
//           variant="filled"
//           // Foglalt: piros, elérhető+nem kiválasztott: szürke, kiválasztott: zöld
//           color={!isAvailable ? 'red' : isSelected ? 'green' : 'grey'}
//           disabled={!isAvailable}                        // csak elérhető székek engedélyezve
//           m={4}
//           p={0}
//           onClick={() => handleSeatClick(i)}
//         >
//           {i}
//         </Button>
//       );
//     }
//     return buttons;
//   };

//   return (
//     <>
//       <Card shadow="sm" padding="lg" radius="md" withBorder>
//         <Text mb="md" fw={700}>Válasszon széket</Text>
//         {loading ? (
//           <Loader />
//         ) : (
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(10, 1fr)',
//             gap: 8,
//             justifyItems: 'center'
//           }}>
//             {renderSeats()}
//           </div>
//         )}
//         {selectedSeats.length > 0 && (
//           <Text mt="md">Kiválasztott székek: {selectedSeats.join(', ')}</Text>
//         )}
//       </Card>

//       <Button
//         color="blue"
//         fullWidth
//         mt="md"
//         radius="md"
//         onClick={() =>
//           navigate('/app/purchase/', { state: { screeningId, seats: selectedSeats } })
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

  const [availableSeats, setAvailableSeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [movieTitle, setMovieTitle] = useState<string | null>(null); // opcionális

  useEffect(() => {
    if (!screeningId) {
      console.error('screeningId nincs megadva');
      return;
    }
    loadAvailableSeats(+screeningId);
  }, [screeningId]);

  const loadAvailableSeats = async (scrId: number) => {
    try {
  const scrRes = await api.Screenings.getScreening(scrId);
  const screening = scrRes.data;
  const roomId = screening.RoomId;
  setMovieTitle(screening.Movie?.Title ?? '');

  const chairsRes = await api.Seats.getAvailableChairsForRoom(roomId);
  console.log('chairsRes.data:', chairsRes.data); // <-- fontos debug

  const chairs = chairsRes.data;
  if (!Array.isArray(chairs)) {
    console.error('Nem tömb jött vissza a székek lekérdezésekor:', chairs);
    setAvailableSeats([]);
    return;
  }

  const nums = chairs.map((c: IChair) => c.id);
  setAvailableSeats(nums);
} catch (err) {
  console.error('Hiba a székek betöltésekor:', err);
  setAvailableSeats([]);
} finally {
  setLoading(false);
}
  };

  const handleSeatClick = (seatNumber: number) => {
    if (!availableSeats.includes(seatNumber)) return;

    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(n => n !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 100; i++) {
      const isAvailable = availableSeats.includes(i);
      const isSelected = selectedSeats.includes(i);
      seats.push(
        <Button
          key={i}
          w={40}
          h={40}
          variant="filled"
          color={!isAvailable ? 'red' : isSelected ? 'green' : 'grey'}
          disabled={!isAvailable}
          m={4}
          p={0}
          onClick={() => handleSeatClick(i)}
        >
          {i}
        </Button>
      );
    }
    return seats;
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
          <Text mt="md">Kiválasztott székek: {selectedSeats.join(', ')}</Text>
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
