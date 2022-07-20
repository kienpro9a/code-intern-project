import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

export const Transcript = () => {
  return (
    <Flex gap="10px" mt="16px">
      <Flex flexDirection="column" w="50%">
        <InputGroup>
          <Input
            pr={{ base: "81px", md: "190px" }}
            placeholder="transcript"
            _placeholder={{ color: "#9B9B9B" }}
            {...InputStyle}
          />
          <InputRightElement w={{ base: "80px", md: "173px" }} h="48px">
            <Button {...ButtonStyle}>
              <Text {...TextButtonStyle}>Edit</Text>
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box
          overflowY="auto"
          bgColor="#FFFFFF"
          h="316px"
          mt="16px"
          p="10px"
          borderRadius="5px"
        >
          {/* <Table>
            </Table> */}
        </Box>
      </Flex>
      <Flex flexDirection="column" w="50%">
        <InputGroup>
          <Input
            pr={{ base: "81px", md: "190px" }}
            placeholder="Input URL script"
            _placeholder={{ color: "#9B9B9B" }}
            {...InputStyle}
          />
          <InputRightElement w={{ base: "80px", md: "173px" }} h="48px">
            <Button {...ButtonStyle}>
              <Text {...TextButtonStyle}>Submit</Text>
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box
          overflowY="auto"
          bgColor="#FFFFFF"
          h="316px"
          mt="16px"
          p="10px"
          borderRadius="5px"
        >
          {/* <Table>
            </Table> */}
        </Box>
      </Flex>
    </Flex>
  );
};

const InputStyle = {
  h: "48px",
  border: "1px",
  borderColor: "#DEDEDE",
  bgColor: "white",
};

const ButtonStyle = {
  w: { base: "80px", md: "173px" },
  h: "48px",
  px: { base: "20px", md: "63px" },
  py: "16px",
  bgColor: "#9B9B9B",
};

const TextButtonStyle = {
  fontSize: "18px",
  fontWeight: "700",
  lineHeight: "28px",
  color: "white",
};
