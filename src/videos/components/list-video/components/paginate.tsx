import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./style-paginate.css";

export const Paginate = ({ meta, /* links*/ position, setPage }) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const pagenum = searchParams.get("page");
  useEffect(() => {
    if (!pagenum || +pagenum > meta.totalPages) {
      setSearchParams({
        page: "1",
      });
    } else setPage(+pagenum);
  }, [pagenum]);
  const handlePageClick = (event) => {
    setSearchParams({
      page: `${event.selected + 1}`,
    });
  };

  if (position === "top") {
    return (
      <Flex
        w="98px"
        h="36px"
        px="8px"
        py="2px"
        border="1px"
        borderColor="#BABABA"
        borderRadius="6px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="14px" fontWeight="600" lineHeight="20px" color="#9B9B9B">
          {meta.currentPage}
        </Text>
        <Text fontSize="14px" fontWeight="600" lineHeight="20px" color="#9B9B9B">
          /
        </Text>
        <Text fontSize="14px" fontWeight="600" lineHeight="20px" color="#9B9B9B">
          {meta.totalPages}
        </Text>
        <ReactPaginate
          nextLabel={<Icon as={ChevronRightIcon} />}
          onPageChange={handlePageClick}
          pageCount={meta.totalPages}
          previousLabel={<Icon as={ChevronLeftIcon} />}
          pageClassName="page-item-disable-top"
          pageLinkClassName="page-link-disable-top"
          previousClassName="page-item-top"
          previousLinkClassName="page-link-top"
          nextClassName="page-item-top"
          nextLinkClassName="page-link-top"
          containerClassName="pagination-top"
        />
      </Flex>
    );
  }
  return (
    <ReactPaginate
      nextLabel={<Icon as={ChevronRightIcon} />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={meta.totalPages}
      previousLabel={<Icon as={ChevronLeftIcon} />}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};
