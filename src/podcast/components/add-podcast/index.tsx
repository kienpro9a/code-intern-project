import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { RenderBreadcrumb } from "src/common/components/breadcrumb";
import { BREAD_CRUMB_ADD_PODCAST } from "src/common/configs/breadcrumb.config";
import { InitialStateAddPodcastType } from "src/podcast/interface";
import { SelectLevel } from "src/podcast/components/add-podcast/components/select-level";
import { SelectTopic } from "src/podcast/components/add-podcast/components/select-topic";
import { InputLinkMemo } from "src/podcast/components/add-podcast/components/input-link";
import { Transcript } from "src/podcast/components/add-podcast/components/transcript";
import { HighLight } from "src/podcast/components/add-podcast/components/highlight";
import {
  CancelDialog,
  SaveDialog,
} from "src/podcast/components/add-podcast/components/dialog";
import { Audio } from "src/podcast/components/add-podcast/components/audio";

const AddPodcast = () => {
  const initialState: InitialStateAddPodcastType = {
    audioCode: "",
    audioTypeKey: "",
    title: "",
    desc: "",
    fileId: 0,
    audioThumbnailId: 0,
    topicKeys: [],
    levelKey: "",
  };
  const [stateAdd, setStateAdd] = useState(initialState);
  const handleAddState = (newdata: object) => {
    setStateAdd({ ...stateAdd, ...newdata });
  };
  // console.log(stateAdd);
  return (
    <>
      <Flex alignItems="center" gap="8px">
        <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_ADD_PODCAST} />
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
      <Audio />
      <Transcript />
      <HighLight />
      <Flex justifyContent="flex-end" mt="16px">
        <CancelDialog initialState={initialState} setState={setStateAdd} />
        <SaveDialog initialState={initialState} setState={setStateAdd} state={stateAdd} />
      </Flex>
    </>
  );
};
export default AddPodcast;
