import type { LoginCredentials } from "../../types";

import { chakra, Input, Button, FormControl, FormErrorMessage, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
}

const initialValues: LoginCredentials = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Debe ser un email válido").required("El campo es requerido"),
  password: Yup.string().required("El campo es requerido"),
});

export default function LoginForm({ onSubmit }: Props) {
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await onSubmit(formik.values);
      formik.resetForm();
    } catch (err) {
      console.error(err);
      const error = err as { message: string };

      toast({
        title: "Login Error",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <chakra.form display="flex" flexDir="column" gap={2} onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={!!(formik.submitCount && formik.errors.email)}>
        <Input
          type="text"
          name="email"
          placeholder="email"
          autoComplete=""
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!(formik.submitCount && formik.errors.password)}>
        <Input
          type="password"
          name="password"
          placeholder="password"
          autoComplete=""
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <Button type="submit" colorScheme="gray">
        Ingresar
      </Button>
    </chakra.form>
  );
}
