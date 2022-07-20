import { Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";

export const Search = ({ search, setSearch }) => {
  const [seacrhInput, setSearchInput] = useState<string>("");
  const handleSearch = () => {
    setSearch(seacrhInput || "");
  };
  const handleReset = () => {
    setSearch("");
    setSearchInput("");
  };
  return (
    <InputGroup w={{ base: "300px", md: "566px" }}>
      <Input
        pr="173px"
        h="48px"
        placeholder="Search"
        _placeholder={{ color: "#9B9B9B" }}
        border="1px"
        borderColor="#DEDEDE"
        bgColor="white"
        value={seacrhInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <InputRightElement w={{ base: "80px", md: "173px" }} h="48px">
        <Button
          w={{ base: "80px", md: "173px" }}
          h="48px"
          px={{ base: "20px", md: "63px" }}
          py="16px"
          bgColor="#9B9B9B"
          onClick={seacrhInput && search === seacrhInput ? handleReset : handleSearch}
        >
          <Text fontSize="18px" fontWeight="700" lineHeight="28px" color="white">
            {seacrhInput && search === seacrhInput ? "Reset" : "Search"}
          </Text>
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
