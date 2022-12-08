import { Container, Heading, HStack, Text, Image, Box } from "@chakra-ui/react";
import { useGetAccount } from "./hooks";

export default function Account() {
  const account = useGetAccount();

  return (
    <Container maxWidth="container.lg">
      <Heading mb={2}>Cuenta</Heading>

      <HStack align="flex-start" gap={2}>
        <Image
          boxSize="130px"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/150"
          src={account.image}
          alt={account.name}
        />

        <Box>
          <Text>Email: {account.email}</Text>
          <Text>Nombre: {account.name}</Text>
          <Text>Direccion: {account.address}</Text>
          <Text>Edad: {account.age}</Text>
          <Text>Telefono: {account.phone}</Text>
        </Box>
      </HStack>
    </Container>
  );
}
