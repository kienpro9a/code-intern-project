import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { RenderBreadcrumb } from "src/common/components/breadcrumb";
import { BREAD_CRUMB_ADD_VIDEO } from "src/common/configs/breadcrumb.config";
import { InitialStateAddVideoType } from "src/videos/interface";
import { SelectLevel } from "src/videos/components/add-video/components/select-level";
import { SelectTopic } from "src/videos/components/add-video/components/select-topic";
import { InputLinkMemo } from "src/videos/components/add-video/components/input-link";
import { Transcript } from "src/videos/components/add-video/components/transcript";
import { HighLight } from "src/videos/components/add-video/components/highlight";
import {
  CancelDialog,
  SaveDialog,
} from "src/videos/components/add-video/components/dialog";

const AddVideo = () => {
  const initialState: InitialStateAddVideoType = {
    levelKey: "",
    transcripts: [],
    name: "",
    desc: "",
    videoUrl: "",
    topicKeys: [],
    highlightWords: [],
  };
  const [stateAdd, setStateAdd] = useState(initialState);
  const handleAddState = (newdata: object) => {
    setStateAdd({ ...stateAdd, ...newdata });
  };
  // console.log(stateAdd);
  return (
    <>
      <Flex alignItems="center" gap="8px">
        <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_ADD_VIDEO} />
      </Flex>
      <Flex alignItems="center" mt="16px">
        <Text w="74px" fontWeight="700" fontSize="18px" lineHeight="28px">
          Level
        </Text>
        <SelectLevel setState={handleAddState} level={stateAdd.levelKey} />
      </Flex>
      <Flex alignItems="center" mt="16px">
        <Text w="74px" fontWeight="700" fontSize="18px" lineHeight="28px">
          Topic
        </Text>
        <SelectTopic setState={handleAddState} topics={stateAdd.topicKeys} />
      </Flex>
      <InputLinkMemo setState={handleAddState} />
      <Transcript setState={handleAddState} state={stateAdd} />
      <HighLight setState={setStateAdd} state={stateAdd} />
      <Flex justifyContent="flex-end" mt="16px">
        <CancelDialog initialState={initialState} setState={setStateAdd} />
        <SaveDialog initialState={initialState} setState={setStateAdd} state={stateAdd} />
      </Flex>
    </>
  );
};
export default AddVideo;
