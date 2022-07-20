import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { SPACE } from "src/common/constants/common.constants";

export const HighLight = ({ trans, highlights }) => {
  const [highlightError, setHighLightError] = useState("");
  const [inputHighlight, setInputHighlight] = useState("");
  const [lengthOfHighlights] = useState(50);
  const addHighLight = (hightlight: string) => {
    highlights.push(hightlight);
    // setState({
    //   ...state,
    //   highlightWords: state.highlightWords,
    // });
  };
  const checkTransIncludeHighlight = (highlight: string) => {
    const isInclude = trans.some((trans) => trans.text.includes(highlight));
    return isInclude;
  };
  const handleAddHighlight = (typeOfAdd: string) => {
    if (inputHighlight) {
      if (checkTransIncludeHighlight(inputHighlight)) {
        setHighLightError("");
        if (!highlights.includes(inputHighlight)) {
          setHighLightError("");
          if (highlights.length < lengthOfHighlights) {
            if (typeOfAdd === "keyword") {
              if (!inputHighlight.match(/[\s.,]/)) {
                setHighLightError("");
                addHighLight(inputHighlight);
              } else setHighLightError("This highlight is not a keyword");
            }
            if (typeOfAdd === "sentence") {
              if (inputHighlight.match(/[\s.,]/)) {
                setHighLightError("");
                addHighLight(inputHighlight);
              } else setHighLightError("This highlight is not a sentence");
            }
          } else
            setHighLightError(
              `The maximum number of highlight (${lengthOfHighlights}) has been reached`
            );
        } else setHighLightError("Highlight is duplicate");
      } else setHighLightError("Highlight isn't exist in Transcript");
      setInputHighlight("");
    }
  };
  const handleDeleteHighlight = (highlightForDelete: string, indexForDelete: number) => {
    highlights = [...highlights].filter((highlight: string, index: number) =>
      highlight === highlightForDelete && index === indexForDelete
        ? index !== indexForDelete
        : true
    );
    setHighLightError("");
    // setState({
    //   ...state,
    //   highlightWords: state.highlightWords,
    // });
  };
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const handleRandomHighlight = (typeOfAdd: string) => {
    const arrayRandomHighlight: string[] = [];
    if (highlights.length < lengthOfHighlights) {
      while (arrayRandomHighlight.length < 10 && highlights.length < lengthOfHighlights) {
        const chosenRandomTranscript = trans[getRandomInt(0, trans.length)];
        const splitText = chosenRandomTranscript.text.split(SPACE);
        setHighLightError("");
        if (typeOfAdd === "keyword") {
          const keywordRandom = splitText[getRandomInt(0, splitText.length)];
          if (!highlights.includes(keywordRandom)) {
            addHighLight(keywordRandom);
            arrayRandomHighlight.push(keywordRandom);
          }
        }
        if (typeOfAdd === "sentence" && splitText.length > 1) {
          const startNewTextAt = getRandomInt(0, splitText.length);
          const endNewTextAt =
            startNewTextAt + getRandomInt(1, splitText.length - startNewTextAt);
          const SentenceRandom = splitText
            .slice(startNewTextAt, endNewTextAt + 1)
            .join(" ");
          if (!highlights.includes(SentenceRandom)) {
            addHighLight(SentenceRandom);
            arrayRandomHighlight.push(SentenceRandom);
          }
        }
      }
      setInputHighlight("");
    } else
      setHighLightError(
        `The maximum number of highlight (${lengthOfHighlights}) has been reached`
      );
  };
  return (
    <>
      <Tabs>
        <TabList mt="16px">
          <Tab borderTopRadius="6px" _selected={{ color: "white", bg: "#9B9B9B" }}>
            Highlight keyword
          </Tab>
          <Tab borderTopRadius="6px" _selected={{ color: "white", bg: "#9B9B9B" }}>
            Highlight sentence
          </Tab>
        </TabList>
        <TabPanels mt="12px">
          <TabPanel p="0">
            <InputGroup>
              <Input
                h="48px"
                placeholder="Input keyword"
                _placeholder={{ color: "#9B9B9B" }}
                border="1px"
                borderColor="#DEDEDE"
                bgColor="white"
                value={inputHighlight}
                onChange={(e) => setInputHighlight(e.target.value)}
              />
              <Button onClick={() => handleAddHighlight("keyword")} {...ButtonStyle}>
                <Text {...TextButtonStyle}>Add</Text>
              </Button>
              <Button onClick={() => handleRandomHighlight("keyword")} {...ButtonStyle}>
                <Text {...TextButtonStyle}>Random</Text>
              </Button>
            </InputGroup>
          </TabPanel>
          <TabPanel p="0">
            <InputGroup>
              <Input
                h="48px"
                placeholder="Input sentences"
                _placeholder={{ color: "#9B9B9B" }}
                border="1px"
                borderColor="#DEDEDE"
                bgColor="white"
                value={inputHighlight}
                onChange={(e) => setInputHighlight(e.target.value)}
              />
              <Button onClick={() => handleAddHighlight("sentence")} {...ButtonStyle}>
                <Text {...TextButtonStyle}>Split up</Text>
              </Button>
              <Button onClick={() => handleRandomHighlight("sentence")} {...ButtonStyle}>
                <Text {...TextButtonStyle}>Random</Text>
              </Button>
            </InputGroup>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Alert mt="12px" status="warning" display={highlightError ? "block" : "none"}>
        <AlertIcon />
        <AlertTitle>{highlightError}</AlertTitle>
      </Alert>
      <Flex
        minH="371px"
        mt="12px"
        p="17px"
        gap="17px"
        bgColor="white"
        flexDirection="row"
        flexWrap="wrap"
        alignContent="flex-start"
      >
        {highlights.map((hl: string, index: number) => {
          return (
            <Flex key={index} borderRadius="6px" bgColor="#F4F4F4">
              <Text fontSize="18px" fontWeight="400" lineHeight="24px" p="8px">
                {hl}
              </Text>
              <IconButton
                aria-label="close"
                onClick={() => handleDeleteHighlight(hl, index)}
                {...IconButtonStyle}
              />
            </Flex>
          );
        })}
      </Flex>
    </>
  );
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

const IconButtonStyle = {
  icon: <Icon as={FiXCircle} w="22px" h="22px" />,
  isRound: true,
  bgColor: "unset",
};
