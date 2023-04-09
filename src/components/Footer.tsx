import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";

export const Footer = () => (
  <Box fontSize="sm" mt="24px">
    <Flex>
      <Spacer />
      <Text>絵： </Text>
      <Link
        href="https://twitter.com/suke_ma_suke"
        target="_blank"
        color="choco.500"
      >
        @suke_ma_suke
      </Link>
    </Flex>
    <Flex mt="4px">
      <Spacer />
      <Text>開発： </Text>
      <Link
        href="https://twitter.com/ryochan_metal"
        target="_blank"
        color="choco.500"
      >
        @ryochan_metal
      </Link>
    </Flex>
  </Box>
);
