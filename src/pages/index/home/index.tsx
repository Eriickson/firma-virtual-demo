import { Avatar, Box, Flex, Heading, HStack, IconButton, Stack, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useIndexContext } from "./.context";
import { LogOut } from "react-feather";
import { FormsForSignatories } from "./FormsForSignatories";

export const IndexPage = () => {
  const { currentUser, getContactOwner, logOut } = useIndexContext();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
    getContactOwner();
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
