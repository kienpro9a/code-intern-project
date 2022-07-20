import { Flex, Input, Text } from "@chakra-ui/react";
import ReactPlayer from "react-player";

export const Audio = () => {
  return (
    <>
      <Flex w="566px" gap="16px" mt="16px">
        <Flex alignItems="center">
          <Text {...TextStyle}>Start</Text>
          <Input {...InputStyle} />
        </Flex>
        <Flex alignItems="center">
          <Text {...TextStyle}>End</Text>
          <Input {...InputStyle} />
        </Flex>
      </Flex>
      <Flex mt="16px">
        <ReactPlayer
          url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          width="100%"
          height="50px"
          controls={true}
        />
      </Flex>
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
