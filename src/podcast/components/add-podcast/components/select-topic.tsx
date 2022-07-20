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
import { getTopics } from "src/videos/api";
import { QUERY_KEY } from "src/common/constants/querykey.constants";

export const SelectTopic = ({ setState, topics }) => {
  const [values, setValues] = useState<string[]>(topics);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, status } = useQuery(
    [QUERY_KEY.TOPIC_LIST, page],
    () => getTopics(page, limit),
    {
      enabled: isOpen,
    }
  );
  useEffect(() => {
    if (data) setIsOpen(false);
  }, [data]);
  const topicsData = data?.data.items;
  const metaData = data?.data.meta;
  useEffect(() => {
    setState({
      topicKeys: values,
    });
  }, [values]);
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        minW="385px"
        maxW="700px"
        minH="48px"
        pr="10px"
        bgColor="#DEDEDE"
        border="1px"
        borderColor="#BABABA"
        _active={{ bgColor: "#DEDEDE" }}
        _hover={{ borderColor: "#CBD5E0" }}
        onClick={() => setIsOpen(!data)}
      >
        <Flex justifyContent="space-between" minH="48px" alignItems="center">
          <Flex maxW="700px" flexWrap="wrap" fontWeight="400" gap="2px 8px">
            {values.length > 0 ? (
              values.map((select: string) => <Text key={select}>{select}</Text>)
            ) : (
              <Text>Please select at least one topic</Text>
            )}
          </Flex>
          <ChevronDownIcon boxSize="5" />
        </Flex>
      </MenuButton>
      <MenuList zIndex="3">
        {status === "loading" && <Heading>Loading...</Heading>}
        {status === "error" && <Heading>Error</Heading>}
        {status === "success" && (
          <>
            <MenuOptionGroup
              title={undefined}
              defaultValue={values}
              type="checkbox"
              onChange={(valuesArray: any) => {
                setValues(valuesArray);
              }}
            >
              {topicsData.map((option) => {
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
