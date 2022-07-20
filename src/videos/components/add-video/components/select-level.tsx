import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import { getLevels } from "src/videos/api";
import { QUERY_KEY } from "src/common/constants/querykey.constants";

type SelectLevelProps = {
  level: string;
  setState: (newdata: object) => void;
};
export const SelectLevel = ({ setState, level }: SelectLevelProps) => {
  const [value, setValue] = useState<string>();
  useEffect(() => {
    setValue(level);
  }, [level]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, status } = useQuery(
    [QUERY_KEY.LEVEL_LIST, page],
    () => getLevels(page, limit),
    {
      enabled: isOpen,
    }
  );
  useEffect(() => {
    if (data) setIsOpen(false);
  }, [data]);
  const lelvelsData = data?.data.items;
  const metaData = data?.data.meta;
  useEffect(() => {
    setState({
      levelKey: value,
    });
  }, [value]);
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        minW="385px"
        h="48px"
        pr="10px"
        bgColor="#DEDEDE"
        border="1px"
        borderColor="#BABABA"
        _active={{ bgColor: "#DEDEDE" }}
        _hover={{ borderColor: "#CBD5E0" }}
        onClick={() => setIsOpen(!data)}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex w="300px" fontWeight="400" overflow="hidden">
            {value ? <Text>{value}</Text> : <Text>Please select one level</Text>}
          </Flex>
          <ChevronDownIcon boxSize="5" />
        </Flex>
      </MenuButton>
      <MenuList>
        {status === "loading" && <Heading>Loading...</Heading>}
        {status === "error" && <Heading>Error</Heading>}
        {status === "success" && (
          <>
            <MenuOptionGroup
              title={undefined}
              defaultValue={value}
              type="radio"
              onChange={(valuesArray: any) => {
                setValue(valuesArray);
              }}
            >
              {lelvelsData.map((option) => {
                return (
                  <MenuItemOption
                    w="385px"
                    key={option.key}
                    as="button"
                    value={option.description}
                  >
                    {option.description}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
            <Flex gap="5px">
              <Button
                {...ButtonStyle}
                onClick={() => setPage(metaData.currentPage - 1)}
                isDisabled={metaData.currentPage - 1 <= 0}
              >
                Previous
              </Button>
              <Button
                {...ButtonStyle}
                onClick={() => setPage(metaData.currentPage + 1)}
                isDisabled={metaData.currentPage + 1 > metaData.totalPages}
              >
                Next
              </Button>
            </Flex>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

const ButtonStyle = {
  w: "50%",
  h: "48px",
  px: "63px",
  py: "16px",
  bgColor: "#9B9B9B",
};
