import type { RegisterData } from "./types";

import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Container, Flex, Heading, Box, Text, Link } from "@chakra-ui/react";

import { useUserContext } from "../../hooks";

import { RegisterForm } from "./components";
import { registerService } from "./services";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useUserContext();

  const handleRegister = async (registerData: RegisterData) => {
    const token = await registerService.register(registerData);

    login(token);
    navigate("/", { replace: true });
  };

  return (
    <Container textAlign="center">
      <Flex flexDir="column" h="100vh" justifyContent="center">
        <Heading mb={4}>Registro</Heading>
        <RegisterForm onSubmit={handleRegister} />

        <Box mt={4} fontSize="sm">
          <Text display="inline-block">Ya tienes una cuenta registrada?</Text>{" "}
          <Link as={ReactLink} to="/login" color="teal.500" href="#">
            Ir a login
          </Link>
        </Box>
      </Flex>
    </Container>
  );
}
