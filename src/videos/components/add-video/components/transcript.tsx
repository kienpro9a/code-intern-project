import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  TranscriptChosenType,
  TranscriptVideoType,
  VideotranscriptInputType,
} from "src/videos/interface";
import { FaYoutube } from "react-icons/fa";
import ReactPlayer from "react-player";
import { toHHMMSSFFF, toMillisecond } from "src/videos/utils";
import TranscriptItemMemo from "src/videos/components/add-video/components/transcript-item";

export const Transcript = ({ setState, state }) => {
  const [transcriptError, setTranscriptError] = useState("");
  const [chosenTranscript, setChosenTranscript] = useState<TranscriptChosenType>({
    index: 0,
    text: "",
    duration: 0,
    offset: 0,
  });
  const [videoTrans, setVideoTrans] = useState<VideotranscriptInputType>({
    start: "",
    end: "",
    transcript: "",
  });
  // They still fixing this: onProgress not firing in Strict Mode
  // onProgress show the playedSeconds
  // const onProgress = (event) => {
  //   console.log(event);
  // };
  const onReady = (event) => {
    const readyVideo = event.getInternalPlayer().getVideoData();
    setState({
      name: readyVideo.title,
      desc: readyVideo.title,
    });
  };
  const setInitialStateTranscript = () => {
    setChosenTranscript({
      index: 0,
      text: "",
      duration: 0,
      offset: 0,
    });
    setVideoTrans({
      start: "",
      end: "",
      transcript: "",
    });
  };
  const handleChooseTranscript = (transcript: TranscriptVideoType, index: number) => {
    if (chosenTranscript.index === index && chosenTranscript.text === transcript.text) {
      setInitialStateTranscript();
    } else {
      setChosenTranscript({
        index,
        text: transcript.text,
        duration: transcript.duration,
        offset: transcript.offset,
      });
      setVideoTrans({
        start: toHHMMSSFFF(transcript.offset),
        end: toHHMMSSFFF(transcript.offset + transcript.duration),
        transcript: transcript.text,
      });
    }
  };
  const checkEmptyValue = (object: {}) => {
    const valueFromArray = Object.values(object);
    return valueFromArray.includes("");
  };
  const handleAddEditVideoTrans = () => {
    if (!checkEmptyValue(videoTrans)) {
      setTranscriptError("");
      const startTime = toMillisecond(videoTrans.start);
      if (startTime) {
        setTranscriptError("");
        const endTime = toMillisecond(videoTrans.end);
        if (endTime) {
          setTranscriptError("");
          if (endTime > startTime) {
            setTranscriptError("");
            if (checkChosenTranscriptInclude) {
              // edit
              state.transcripts[chosenTranscript.index] = {
                text: videoTrans.transcript,
                duration: endTime - startTime,
                offset: startTime,
              };
              setState({
                transcripts: state.transcripts,
              });
            } else {
              // add
              setState({
                transcripts: [
                  ...state.transcripts,
                  {
                    text: videoTrans.transcript,
                    duration: endTime - startTime,
                    offset: startTime,
                  },
                ],
              });
            }
            setInitialStateTranscript();
          } else setTranscriptError("End time need to be bigger than Start time");
        } else setTranscriptError("End time incorrect, form: HH:MM:SS or HH:MM:SS.FFF");
      } else setTranscriptError("Start time incorrect, form: HH:MM:SS or HH:MM:SS.FFF");
    } else setTranscriptError("Please fill in all value of the form");
  };
  const handleDeleteTranscript = (indexForDelete: number) => {
    setState({
      transcripts: state.transcripts.filter(
        (_, index: number) => index !== indexForDelete
      ),
    });
    setInitialStateTranscript();
  };
  const checkChosenTranscriptInclude = state.transcripts.some(
    (trans: TranscriptVideoType, index: number) =>
      chosenTranscript.index === index && chosenTranscript.text === trans.text
  );
  return (
    <>
      <Alert mt="12px" status="warning" display={transcriptError ? "block" : "none"}>
        <AlertIcon />
        <AlertTitle>{transcriptError}</AlertTitle>
      </Alert>
      <FormControl as={Flex} justifyContent="space-between" mt="16px">
        <Flex flexDirection="column" w="566px">
          <Flex gap="16px">
            <Flex alignItems="center">
              <Text {...TextStyle}>Start</Text>
              <Input
                value={videoTrans.start}
                onChange={(e) => {
                  setVideoTrans({ ...videoTrans, start: e.target.value });
                }}
                {...InputStyle}
              />
            </Flex>
            <Flex alignItems="center">
              <Text {...TextStyle}>End</Text>
              <Input
                value={videoTrans.end}
                onChange={(e) => {
                  setVideoTrans({ ...videoTrans, end: e.target.value });
                }}
                {...InputStyle}
              />
            </Flex>
          </Flex>
          <Box h="318px" mt="16px" bgColor="#BABABA" borderRadius="6px">
            {state.videoUrl ? (
              <ReactPlayer
                url={state.videoUrl}
                width="100%"
                height="318px"
                controls={true}
                onReady={onReady}
                // onProgress={onProgress}
              />
            ) : (
              <Flex h="318px" justifyContent="center" alignItems="center">
                <Icon as={FaYoutube} boxSize={20} color="red" />
                <Text fontSize="60px" fontWeight="500" letterSpacing="-0.1em">
                  YouTube
                </Text>
              </Flex>
            )}
          </Box>
        </Flex>
        <Flex flexDirection="column" w="566px">
          <InputGroup>
            <Input
              value={videoTrans.transcript}
              onChange={(e) => {
                setVideoTrans({ ...videoTrans, transcript: e.target.value });
              }}
              pr={{ base: "81px", md: "190px" }}
              placeholder="transcript"
              _placeholder={{ color: "#9B9B9B" }}
              {...InputStyle}
            />
            <InputRightElement w={{ base: "80px", md: "173px" }} h="48px">
              <Button onClick={handleAddEditVideoTrans} {...ButtonStyle}>
                <Text {...TextButtonStyle}>
                  {checkChosenTranscriptInclude ? "Edit" : "Add"}
                </Text>
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
            <Table>
              <Tbody>
                {state.transcripts.map((trans: TranscriptVideoType, index: number) => {
                  const checkIsChosen =
                    chosenTranscript.index === index &&
                    chosenTranscript.text === trans.text;
                  return (
                    <TranscriptItemMemo
                      key={index}
                      state={state}
                      trans={trans}
                      index={index}
                      isSelected={checkIsChosen}
                      onSelect={handleChooseTranscript}
                      onDelete={handleDeleteTranscript}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </FormControl>
    </>
  );
};

const TextStyle = {
  fontWeight: "700",
  w: "73px",
  fontSize: "18px",
  lineHeight: "28px",
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
