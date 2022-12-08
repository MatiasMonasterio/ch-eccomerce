import { useParams } from "react-router-dom";
import { Heading, Container, Flex, Image, Text, Box, Button } from "@chakra-ui/react";

import { ProductCartButton } from "../../components";

import { useGetProduct } from "./hooks";

export default function Product() {
  const { productId } = useParams();

  const product = useGetProduct(productId);

  return (
    <Container maxWidth="container.lg">
      <Flex gap={4}>
        <Image
          boxSize="220px"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/150"
          src={product?.image}
          alt={product?.name}
        />

        <Flex flexDir="column">
          <Heading>{product?.name}</Heading>

          <Box fontSize="md" color="blackAlpha.800" mb={6}>
            <Text>Descripcion: {product?.description}</Text>
            <Text>Precio: {product?.price}</Text>
            <Text>Stock: {product?.stock}</Text>
          </Box>

          <Flex>{product && <ProductCartButton product={product} />}</Flex>
        </Flex>

        <Flex ml="auto" gap={2}>
          {/* <Button colorScheme="red" variant="outline">
            Eliminar
          </Button>

          <Button colorScheme="teal" variant="outline">
            Editar
          </Button> */}
        </Flex>
      </Flex>
    </Container>
  );
}
