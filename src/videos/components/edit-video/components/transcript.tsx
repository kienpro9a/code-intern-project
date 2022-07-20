import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { TranscriptChosenType, VideotranscriptInputType } from "src/videos/interface";
import ReactPlayer from "react-player";
import { toHHMMSSFFF, toMillisecond } from "src/videos/utils";
import TranscriptItemMemo from "src/videos/components/edit-video/components/transcript-item";
import { useMutation } from "react-query";
// import { addTranscript, deleteTranscript, editTranscript } from "src/videos/api";
import { addTranscript, editTranscript } from "src/videos/api";

export const Transcript = ({ videoId, videoUrl, trans, refetch }) => {
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
  const { mutate: mutateAddTrans } = useMutation(addTranscript);
  const { mutate: mutateEditTrans } = useMutation(editTranscript);
  // const { mutate: mutateDeleteTrans } = useMutation(deleteTranscript);

  // They still fixing this: onProgress not firing in Strict Mode
  // onProgress show the playedSeconds
  // const onProgress = (event) => {
  //   console.log(event);
  // };
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
  const handleChooseTranscript = (transcript) => {
    if (chosenTranscript.index === transcript.id) {
      setInitialStateTranscript();
    } else {
      setChosenTranscript({
        index: transcript.id,
        text: transcript.content,
        duration: transcript.duration,
        offset: transcript.startTime,
      });
      setVideoTrans({
        start: toHHMMSSFFF(transcript.startTime),
        end: toHHMMSSFFF(transcript.startTime + transcript.duration),
        transcript: transcript.content,
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
              const editData = {
                text: videoTrans.transcript,
                duration: endTime - startTime,
                offset: startTime,
                transcriptId: chosenTranscript.index,
              };
              mutateEditTrans(editData);
              refetch();
            } else {
              // add
              const addData = {
                text: videoTrans.transcript,
                videoId,
                duration: endTime - startTime,
                offset: startTime,
              };
              mutateAddTrans(addData);
              refetch();
            }
            setInitialStateTranscript();
          } else setTranscriptError("End time need to be bigger than Start time");
        } else setTranscriptError("End time incorrect, form: HH:MM:SS or HH:MM:SS.FFF");
      } else setTranscriptError("Start time incorrect, form: HH:MM:SS or HH:MM:SS.FFF");
    } else setTranscriptError("Please fill in all value of the form");
  };
  const handleDeleteTranscript = (indexForDelete: number) => {
    // const idsDelete = { transcriptId: indexForDelete };
    // mutateDeleteTrans(idsDelete);
    // refetch()
    console.log(indexForDelete);
    setInitialStateTranscript();
  };
  const checkChosenTranscriptInclude = trans.some(
    (tran) => chosenTranscript.index === tran.id
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
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="318px"
              controls={true}
              // onProgress={onProgress}
            />
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
                {trans
                  .sort((a, b) => {
                    if (a.startTime > b.startTime) return 1;
                    if (a.startTime < b.startTime) return -1;
                    return 0;
                  })
                  .map((tran) => {
                    const checkIsChosen = chosenTranscript.index === tran.id;
                    return (
                      <TranscriptItemMemo
                        key={tran.id}
                        trans={tran}
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
