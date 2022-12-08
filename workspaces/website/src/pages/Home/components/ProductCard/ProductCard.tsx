import type { Product } from "../../../../domain";

import { HStack, Box, Heading, Text, Image } from "@chakra-ui/react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  console.log(product);
  return (
    <HStack gap={1} py={1} px={2} border="1px solid" borderColor="blackAlpha.400" borderRadius="md">
      <Box>
        <Image
          boxSize="80px"
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
    </HStack>
  );
}
