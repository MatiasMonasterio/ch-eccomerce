import { useNavigate, Link as ReactLink } from "react-router-dom";
import { Container, HStack, Heading, Button, Link } from "@chakra-ui/react";
import { useUserContext } from "../../../../hooks";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useUserContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxWidth="container.lg" py={2} mb={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Link as={ReactLink} to="/" _hover={{ textDecoration: "none" }}>
          <Heading size="md">Coderhouse Eccomerce</Heading>
        </Link>

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
