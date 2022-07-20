import { Button, Input, InputGroup, Text } from "@chakra-ui/react";

export const InputLink = ({ videoUrl }) => {
  return (
    <>
      <InputGroup mt="16px">
        <Input
          pr={{ base: "80px", md: "173px" }}
          h="48px"
          placeholder="Input URL video"
          _placeholder={{ color: "#9B9B9B" }}
          border="1px"
          borderColor="#DEDEDE"
          bgColor="white"
          isDisabled={true}
          value={videoUrl}
        />
        <Button
          w={{ base: "80px", md: "173px" }}
          h="48px"
          px={{ base: "20px", md: "63px" }}
          py="16px"
          bgColor="#9B9B9B"
          isDisabled={true}
        >
          <Text fontSize="18px" fontWeight="700" lineHeight="28px" color="white">
            Convert
          </Text>
        </Button>
      </InputGroup>
    </>
  );
};
