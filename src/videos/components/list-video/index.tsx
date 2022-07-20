import { RenderBreadcrumb } from "src/common/components/breadcrumb";
import { BREAD_CRUMB_VIDEO } from "src/common/configs/breadcrumb.config";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ADDVIDEO_PAGE } from "src/common/constants/routes.constants";
import { Search } from "./components/search";
import { FormTable } from "./components/table";
import { Paginate } from "./components/paginate";
import { SelectMenu } from "./components/select-filter";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getVideos } from "src/videos/api";

const VideoList = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [limit] = useState(10);
  const [filter, setFilter] = useState({ level: [], topic: [] });
  const { data, status, refetch } = useQuery(["videos", page, limit, search], () =>
    getVideos(page, limit, search)
  );
  const videosData = data?.data.items;
  const metaData = data?.data.meta;
  // const linksData = data?.data.links;
  // BE said: Level and Topic is not implemented yet, so just put filter like this
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  if (status === "loading") {
    return <Heading>Loading...</Heading>;
  }
  if (status === "error") {
    return <Heading>Error</Heading>;
  }
  return (
    <>
      <Flex alignItems="center" gap="8px">
        <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_VIDEO} />
      </Flex>
      <Flex justifyContent="space-between" mt="32px">
        <Link to={ADDVIDEO_PAGE}>
          <Button {...ButtonStyle}>Add new</Button>
        </Link>
        <Search search={search} setSearch={setSearch} />
      </Flex>
      <Flex justifyContent="space-between" mt="14px">
        <SelectMenu setFilter={setFilter} />
        <Paginate
          meta={metaData}
          /* links={linksData}*/
          position={"top"}
          setPage={setPage}
        />
      </Flex>
      <FormTable items={videosData} page={metaData.currentPage} refetch={refetch} />
      <Paginate
        meta={metaData}
        /* links={linksData}*/
        position={"bottom"}
        setPage={setPage}
      />
    </>
  );
};
export default VideoList;

const ButtonStyle = {
  px: "16px",
  py: "10px",
  h: "48px",
  bgColor: "#9B9B9B",
  color: "white",
  _hover: { bg: "#737373" },
};
