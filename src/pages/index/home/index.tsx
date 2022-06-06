import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  List,
  ListItem,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useIndexContext } from "./.context";
import { LogOut } from "react-feather";
import { useForm } from "react-hook-form";

export const IndexPage = () => {
  const { currentUser, isAuth, getAllContacts, logOut } = useIndexContext();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <Box>
      <Box mb="4" borderWidth="1px" px="20" py="4" shadow="md">
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Heading size="lg" color="gray.700">
              Firma Virtual
            </Heading>
          </Box>
          <HStack>
            <Stack alignItems="flex-end">
              {currentUser && !isSSR && (
                <Text lineHeight="none" fontWeight="semibold">
                  {currentUser.firstName} {currentUser.lastName}
                </Text>
              )}

              <Tag userSelect="none" colorScheme="green" size="sm">
                Usuario Logeado
              </Tag>
            </Stack>
            <Box>
              <Avatar size="md" />
            </Box>
            <IconButton size="sm" aria-label="" icon={<LogOut size="1.25rem" />} onClick={logOut} />
          </HStack>
        </Flex>
      </Box>

      <FormsForSignatories />
    </Box>
  );
};

const FormsForSignatories = () => {
  const { register, handleSubmit } = useForm();
  const [fields] = useState([
    { id: 1, name: "fullName", placeholder: "sdadsdas", label: "Nombre Completo" },
    { id: 2, name: "email", placeholder: "sdadsdas", label: "Correo electrónico" },
    { id: 3, name: "RUT", placeholder: "sdadsdas", label: "RUT (Sin puntos y con guión)" },
    { id: 4, name: "phone", placeholder: "sdadsdas", label: "Número de celular" },
  ]);

  return (
    <Box mx="auto" maxW="6xl" px="20">
      <Stack>
        {fields.map((field) => {
          return (
            <FormControl position="relative" key={field.id}>
              <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              <Input
                id={field.name}
                type={field.name}
                {...register(field.name, { required: true })}
                placeholder={field.placeholder}
              />
              {field.id === 10 && (
                <Box pos="absolute" top="20" w="full" zIndex="1">
                  <Box w="full" bgColor="white" borderWidth="1px" rounded="sm" shadow="sm">
                    <List>
                      <ListItem px="4" py="1.5">
                        Lorem ipsum dolor sit amet
                      </ListItem>
                      <Divider />
                      <ListItem px="4" py="1.5">
                        Lorem ipsum dolor sit amet
                      </ListItem>
                      <Divider />
                      <ListItem px="4" py="1.5">
                        Lorem ipsum dolor sit amet
                      </ListItem>
                      <Divider />
                      <ListItem px="4" py="1.5">
                        Lorem ipsum dolor sit amet
                      </ListItem>
                      <Divider />
                      <ListItem px="4" py="1.5">
                        Lorem ipsum dolor sit amet
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              )}
            </FormControl>
          );
        })}
        <Checkbox>Este firmante realizará el pago del 50% o 100% del trámite</Checkbox>
        <HStack justifyContent="space-between">
          <Text mr="10" fontSize="sm">
            Seleeciona almenos 1 de los firmates como responsable del pago. Puedes dividir el pago hasta 2 firmantes.
          </Text>
          <Button rounded="sm" minW="max-content" colorScheme="blue">
            Seleccionar quienes serán responsables del pago
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};
