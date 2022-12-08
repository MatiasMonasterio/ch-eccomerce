import type { Product } from "../../domain";

import { useNavigate } from "react-router-dom";
import { Flex, Box, Heading, Text, Image, Button } from "@chakra-ui/react";

import { ProductCartButton } from "../../components";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();

  const handleShowProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Flex gap={4} p={2} border="1px solid" borderColor="blackAlpha.400" borderRadius="md">
      <Box>
        <Image
          boxSize="90px"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/150"
          src={product.image}
          alt={product.name}
        />
      </Box>

      <Box>
        <Heading size="md">{product.name}</Heading>
        <Box fontSize="sm" textColor="gray.700">
          <Text>Descripcion: {product.description}</Text>
          <Text>Precio: {product.price}</Text>
          <Text>Stock: {product.stock}</Text>
        </Box>
      </Box>

      <Flex ml="auto" justifyContent="center" flexDirection="column" gap={2}>
        <ProductCartButton product={product} />

        <Button size="sm" onClick={handleShowProduct} colorScheme="gray">
          Ver producto
        </Button>
      </Flex>
    </Flex>
  );
}
