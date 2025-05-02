import { Card, Text, Button, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";


const Seats = () => {
  const navigate = useNavigate();
  const [bookedSeats, setBookedSeats] = useState<number[]>([]); // Backend által lefoglalt székek
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Felhasználó által kiválasztott székek
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookedSeats();
  }, []);

  const loadBookedSeats = async () => {
    // Példa API hívás – valós környezetben fetch vagy axios
    // const response = await fetch('/api/seats/booked');
    // const data = await response.json();
    const data = [5, 17, 34, 55, 78]; // DEMO adat
    setBookedSeats(data);
    setLoading(false);
  };

  const handleSeatClick = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return; // Ne engedje a foglalt szék kiválasztását

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((n) => n !== seatNumber) // ha már kiválasztott, akkor törli
        : [...prev, seatNumber] // különben hozzáadja
    );
  };

  const renderSeats = () => {
    const seats = [];

    for (let i = 1; i <= 100; i++) {
      const isBooked = bookedSeats.includes(i);
      const isSelected = selectedSeats.includes(i);

      seats.push(
        <Button
          key={i}
          w={40}
          h={40}
          variant="filled"
          color={isBooked ? 'red' : isSelected ? 'green' : 'gray'}
          disabled={isBooked}
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
    <Button color="blue" fullWidth mt="md" radius="md" onClick={() => navigate('/app/purchase')}>Tovább a fizetéshez</Button>
    </>
  );
};

export default Seats;
