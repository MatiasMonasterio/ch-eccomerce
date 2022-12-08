import type { LoginCredentials } from "./types";
import type { Token } from "../../types";

import { useNavigate, Link as ReactLink } from "react-router-dom";
import { Container, Heading, Flex, Box, Text, Link } from "@chakra-ui/react";

import { useUserContext } from "../../hooks";

import { LoginForm } from "./components";
import { loginService } from "./services";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUserContext();

  const handleLogin = async (credentials: LoginCredentials) => {
    const token: Token = await loginService.login(credentials);

    login(token);
    navigate("/", { replace: true });
  };

  return (
    <Container textAlign="center">
      <Flex flexDir="column" h="100vh" justifyContent="center">
        <Heading mb={4}>Login</Heading>
        <LoginForm onSubmit={handleLogin} />

        <Box mt={4} fontSize="sm">
          <Text display="inline-block">Todavía no tienes una cuenta?</Text>{" "}
          <Link as={ReactLink} to="/register" color="teal.500" href="#">
            Registrate
          </Link>
        </Box>
      </Flex>
    </Container>
  );
}
