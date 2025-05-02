import { Card, Image, Text, Badge, Button, Group, Alert } from '@mantine/core';
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





