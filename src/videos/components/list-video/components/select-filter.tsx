import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getLevels, getTopics } from "src/videos/api";
import { useQuery } from "react-query";

export const SelectMenu = ({ setFilter }) => {
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterTopic, setFilterTopic] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState({ level: 1, topic: 1 });
  const [limit] = useState(10);
  const queryLevels = useQuery(
    ["levels-filter", page.level],
    () => getLevels(page.level, limit),
    {
      enabled: isOpen,
    }
  );
  const queryTopics = useQuery(
    ["topics-filter", page.topic],
    () => getTopics(page.topic, limit),
    {
      enabled: isOpen,
    }
  );
  const dataLevels = queryLevels.data?.data;
  const dataTopics = queryTopics.data?.data;
  const onChangeCheckLevel = (value: any) => {
    setFilterLevel(value);
  };
  const onChangeCheckTopic = (value: any) => {
    setFilterTopic(value);
  };
  useEffect(() => {
    setFilter({
      level: filterLevel,
      topic: filterTopic,
    });
  }, [filterLevel, filterTopic]);
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<FaFilter />}
        variant="outline"
        w="81px"
        h="36px"
        p="8px"
        gap="4px"
        color="#9B9B9B"
        border="1px"
        borderColor="#BABABA"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text
          ml="8px"
          my="2px"
          fontSize="14px"
          fontWeight="400"
          lineHeight="20px"
          letterSpacing="0.25px"
        >
          Filter
        </Text>
      </MenuButton>
      <MenuList>
        <Flex gap="10px">
          {queryLevels.status === "success" && (
            <Box minWidth="200px">
              <MenuOptionGroup
                title="Level"
                type="checkbox"
                onChange={onChangeCheckLevel}
                value={filterLevel}
              >
                {dataLevels.items.map((level) => {
                  return (
                    <MenuItemOption key={level.key} value={level.description}>
                      {level.description}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
              <WhiteSpace array={dataLevels.items} limit={limit} />
              <Flex>
                <Button
                  {...ButtonStyle}
                  onClick={() =>
                    setPage({ ...page, level: dataLevels.meta.currentPage - 1 })
                  }
                  isDisabled={dataLevels.meta.currentPage - 1 <= 0}
                >
                  Previous
                </Button>
                <Button
                  {...ButtonStyle}
                  onClick={() =>
                    setPage({ ...page, level: dataLevels.meta.currentPage + 1 })
                  }
                  isDisabled={
                    dataLevels.meta.currentPage + 1 > dataLevels.meta.totalPages
                  }
                >
                  Next
                </Button>
              </Flex>
            </Box>
          )}
          {queryTopics.status === "success" && (
            <Box minWidth="200px">
              <MenuOptionGroup
                title="Topic"
                type="checkbox"
                onChange={onChangeCheckTopic}
                value={filterTopic}
              >
                {dataTopics.items.map((topic) => {
                  return (
                    <MenuItemOption key={topic.key} value={topic.description}>
                      {topic.description}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
              <WhiteSpace array={dataTopics.items} limit={limit} />
              <Flex gap="5px">
                <Button
                  {...ButtonStyle}
                  onClick={() =>
                    setPage({ ...page, topic: dataTopics.meta.currentPage - 1 })
                  }
                  isDisabled={dataTopics.meta.currentPage - 1 <= 0}
                >
                  Previous
                </Button>
                <Button
                  {...ButtonStyle}
                  onClick={() =>
                    setPage({ ...page, topic: dataTopics.meta.currentPage + 1 })
                  }
                  isDisabled={
                    dataTopics.meta.currentPage + 1 > dataTopics.meta.totalPages
                  }
                >
                  Next
                </Button>
              </Flex>
            </Box>
          )}
        </Flex>
      </MenuList>
    </Menu>
  );
};

const WhiteSpace = ({ array, limit }) => {
  const rows: number[] = [];
  for (let i = 0; i < limit - array.length; i++) {
    rows.push(i);
  }
  return (
    <ul>
      {rows.map((row) => (
        <Box key={row} w="200px" h="36.78px" />
      ))}
    </ul>
  );
};

const ButtonStyle = {
  w: "100px",
  h: "48px",
  px: "63px",
  py: "16px",
  bgColor: "#9B9B9B",
};
