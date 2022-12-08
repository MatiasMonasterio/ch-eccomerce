import { Container, Heading, Alert, AlertIcon, Flex, Button } from "@chakra-ui/react";

import { ProductCard } from "../../components";
import { useCartContext, useLoading } from "../../hooks";

export default function Carts() {
  const { cart, deleteCart, purchase } = useCartContext();
  const { isLoading, initLoadiading, endLoading } = useLoading(false);

  const handlePurchase = async () => {
    initLoadiading();
    await purchase();
    endLoading();
  };

  return (
    <Container maxWidth="container.lg">
      <Heading mb={2}>Carrito</Heading>

      {!cart.products.length && (
        <Alert status="warning">
          <AlertIcon />
          No hay productos cargados
        </Alert>
      )}

      {cart.products.length ? (
        <>
          <Heading size="md" mb={2}>
            Productos ({cart.products.length})
          </Heading>

          <Flex flexDir="column" gap={2} mb={4}>
            {cart.products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </Flex>

          <Flex gap={2} justifyContent="flex-end">
            <Button size="sm" colorScheme="red" variant="outline" onClick={deleteCart}>
              Eliminar carrito
            </Button>

            <Button
              size="sm"
              colorScheme="teal"
              variant="outline"
              disabled={isLoading}
              onClick={handlePurchase}
            >
              Terminar compra
            </Button>
          </Flex>
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
