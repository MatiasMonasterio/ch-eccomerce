import type { Product } from "../../domain";

import { useMemo } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useCartContext } from "../../hooks";

interface Props {
  product: Product;
}

export default function ProductCartButton({ product }: Props) {
  const toast = useToast();

  const { addProduct, removeProduct, cart } = useCartContext();

  const handleAddCart = () => {
    addProduct(product);

    toast({
      title: "Agregado!",
      description: "Producto agregado al carrito",
      status: "success",
      isClosable: true,
      position: "top-right",
    });
  };

  const handleRemoveCart = () => {
    removeProduct(product);

    toast({
      title: "Eliminado!",
      description: "Producto eliminado al carrito",
      status: "warning",
      isClosable: true,
      position: "top-right",
    });
  };

  const isOnCart: boolean = useMemo(() => {
    const productExist = cart.products.find((productCart) => productCart.id === product.id);
    return !!productExist;
  }, [cart.products]);

  return (
    <>
      {isOnCart && (
        <Button size="sm" onClick={handleRemoveCart} colorScheme="red">
          Eliminar de carrito
        </Button>
      )}

      {!isOnCart && (
        <Button size="sm" onClick={handleAddCart} colorScheme="teal">
          Agregar a carrito
        </Button>
      )}
    </>
  );
}
