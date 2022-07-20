import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { RenderBreadcrumb } from "src/common/components/breadcrumb";
import { BREAD_CRUMB_EDIT_VIDEO } from "src/common/configs/breadcrumb.config";
import { InitialStateEditVideoType } from "src/videos/interface";
import { SelectLevel } from "src/videos/components/edit-video/components/select-level";
import { SelectTopic } from "src/videos/components/edit-video/components/select-topic";
import { InputLink } from "src/videos/components/edit-video/components/input-link";
import { Transcript } from "src/videos/components/edit-video/components/transcript";
import { HighLight } from "src/videos/components/edit-video/components/highlight";
import { SaveDialog } from "src/videos/components/edit-video/components/dialog";
import { useQuery } from "react-query";
import { getVideo } from "src/videos/api";

const EditVideo = () => {
  const { videoID } = useParams();
  const initialStateEdit: InitialStateEditVideoType = {
    levelKey: "",
    name: "",
    desc: "",
    videoId: 0,
  };
  const [stateEdit, setStateEdit] = useState(initialStateEdit);
  const { data, status, refetch } = useQuery(["videoDetail", videoID], () =>
    getVideo(+videoID!)
  );
  const videoData = data?.data;
  // console.log(videoData);
  useEffect(() => {
    if (status === "success") {
      const edit: InitialStateEditVideoType = {
        levelKey: videoData.levelKey,
        name: videoData.name,
        desc: videoData.desc,
        videoId: videoData.id,
      };
      setStateEdit(edit);
    }
  }, [data]);
  const handleEditState = (newdata: object) => {
    setStateEdit({ ...stateEdit, ...newdata });
  };
  if (status === "loading") {
    return <Heading>Loading...</Heading>;
  }
  if (status === "error") {
    return <Heading>Error</Heading>;
  }
  return (
    <>
      <Flex alignItems="center" gap="8px">
        <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_EDIT_VIDEO} />
      </Flex>
      <Flex alignItems="center" mt="16px">
        <Text w="74px" fontWeight="700" fontSize="18px" lineHeight="28px">
          Level
        </Text>
        <SelectLevel setState={handleEditState} level={videoData.levelKey} />
      </Flex>
      <Flex alignItems="center" mt="16px">
        <Text w="74px" fontWeight="700" fontSize="18px" lineHeight="28px">
          Topic
        </Text>
        <SelectTopic
          videoId={videoData.id}
          topics={videoData.videosToTopics}
          refetch={refetch}
        />
      </Flex>
      <InputLink videoUrl={videoData.link} />
      <Transcript
        videoId={videoData.id}
        videoUrl={videoData.link}
        trans={videoData.videoTranscripts}
        refetch={refetch}
      />
      <HighLight
        trans={videoData.videoTranscripts}
        highlights={videoData.videoHighlightWords}
      />
      <Flex justifyContent="flex-end" mt="16px">
        <SaveDialog state={stateEdit} />
      </Flex>
    </>
  );
};
export default EditVideo;
