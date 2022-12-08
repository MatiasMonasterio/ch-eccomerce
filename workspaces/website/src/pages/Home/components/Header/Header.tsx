import { useNavigate, Link as ReactLink } from "react-router-dom";
import { Container, HStack, Heading, Button, Link } from "@chakra-ui/react";
import { useUserContext } from "../../../../hooks";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useUserContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxWidth="container.lg" py={2} mb={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading>Coderhouse Eccomerce</Heading>

        <HStack gap={1}>
          <Link as={ReactLink} to="/">
            Productos
          </Link>

          <Link as={ReactLink} to="/cart">
            Carrito
          </Link>

          <Link as={ReactLink} to="/account">
            Cuenta
          </Link>
          <Button onClick={handleLogout}>Log out</Button>
        </HStack>
      </HStack>
    </Container>
  );
}
