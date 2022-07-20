import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { parseYoutubeUrl } from "src/videos/components/common/getDataYoutube";
import { useQuery } from "react-query";
import { getVideoTranscript } from "src/videos/api";

const InputLink = ({ setState }) => {
  const [videoUrlInput, setVideoUrlInput] = useState<string>("");
  const [checkVideoUrl, setCheckVideoUrl] = useState<boolean>(false);
  const [startFetch, setStartFetch] = useState<boolean>(false);
  const { data, status } = useQuery(
    ["videotranscript", videoUrlInput, "youtube"],
    () => getVideoTranscript(videoUrlInput, "youtube"),
    {
      enabled: startFetch,
    }
  );
  const handleSetUrl = () => {
    if (videoUrlInput) {
      const youtubeId = parseYoutubeUrl(videoUrlInput);
      if (youtubeId) {
        setCheckVideoUrl(false);
        setStartFetch(true);
      } else setCheckVideoUrl(true);
    } else setCheckVideoUrl(true);
  };
  useEffect(() => {
    if (status === "success") {
      const youtubeId = parseYoutubeUrl(videoUrlInput);
      setState({
        transcripts: data.data,
        videoUrl: "https://www.youtube.com/watch?v=" + youtubeId,
      });
      setStartFetch(false);
    }
  }, [status, startFetch]);
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
          value={videoUrlInput}
          onChange={(e) => setVideoUrlInput(e.target.value)}
        />
        <Button
          w={{ base: "80px", md: "173px" }}
          h="48px"
          px={{ base: "20px", md: "63px" }}
          py="16px"
          bgColor="#9B9B9B"
          onClick={handleSetUrl}
        >
          <Text fontSize="18px" fontWeight="700" lineHeight="28px" color="white">
            Convert
          </Text>
        </Button>
      </InputGroup>
      <>{checkVideoUrl}</>
      {(status === "loading" || startFetch) && <Heading>Loading...</Heading>}
      {status === "error" && <Heading>Error</Heading>}
      <Alert mt="12px" status="warning" display={checkVideoUrl ? "block" : "none"}>
        <AlertIcon />
        <AlertTitle>Please fill in the correct URL</AlertTitle>
      </Alert>
    </>
  );
};

function checkPropsAreEqual(prevMovie, nextMovie) {
  return (
    prevMovie.setState === nextMovie.setState && prevMovie.videoUrl === nextMovie.videoUrl
  );
}
export const InputLinkMemo = React.memo(InputLink, checkPropsAreEqual);
