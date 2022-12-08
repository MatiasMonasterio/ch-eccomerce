import { Flex, Container, Heading } from "@chakra-ui/react";

import { ProductCard } from "../../components";
import { useGetProducts } from "./hooks";

export default function Home() {
  const products = useGetProducts();

  return (
    <>
      <Container maxWidth="container.lg">
        <Heading size="lg" mb={2}>
          Productos ({products.length})
        </Heading>

        <Flex flexDirection="column" gap={2}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Flex>
      </Container>
    </>
  );
}
