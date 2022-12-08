import type { RegisterData } from "../../types";
import type { InputProps } from "@chakra-ui/react";

import { chakra, FormControl, Input, FormErrorMessage, Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onSubmit: (registerData: RegisterData) => Promise<void>;
}

const initialValues: RegisterData = {
  email: "",
  password: "",
  name: "",
  address: "",
  phone: "",
  age: 0,
  image: undefined,
};

const validationSchema = Yup.object({
  email: Yup.string().email("Debe ser un email válido").required("El campo es requerido"),
  password: Yup.string().required("El campo es requerido"),
  name: Yup.string(),
  address: Yup.string(),
  phone: Yup.string(),
  age: Yup.number().min(0),
});

interface InputFileProps extends InputProps {
  onFileChange: (file: File) => void;
}

const InputFile = ({ onFileChange }: InputFileProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileChange(e.target.files[0]);
    }
  };

  return <input type="file" onChange={handleFileChange} />;
};

export default function RegisterForm({ onSubmit }: Props) {
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await onSubmit(formik.values);
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

      <FormControl isInvalid={!!(formik.submitCount && formik.errors.name)}>
        <Input
          type="text"
          name="name"
          placeholder="nombre"
          autoComplete=""
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!(formik.submitCount && formik.errors.address)}>
        <Input
          type="text"
          name="address"
          placeholder="dirección"
          autoComplete=""
          value={formik.values.address}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!(formik.submitCount && formik.errors.age)}>
        <Input
          type="number"
          name="age"
          placeholder="edad"
          autoComplete=""
          value={formik.values.age || ""}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.age}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!(formik.submitCount && formik.errors.phone)}>
        <Input
          type="string"
          name="phone"
          placeholder="telefono"
          autoComplete=""
          value={formik.values.phone || ""}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!(formik.submitCount && formik.errors.image)}>
        <InputFile
          name="image"
          placeholder="imagen"
          onFileChange={(image: File) => formik.setFieldValue("image", image)}
        />

        <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
      </FormControl>

      <Button type="submit" colorScheme="gray">
        Registrar
      </Button>
    </chakra.form>
  );
}
