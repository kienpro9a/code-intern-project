import { ADDPODCAST_PAGE } from "src/common/constants/routes.constants";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PodcastList = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(ADDPODCAST_PAGE)}>Add Podcast</Button>;
};
export default PodcastList;
