import {
  Box,
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toHHMMSS } from "src/videos/utils";
import { EDITVIDEO_PAGE } from "src/common/constants/routes.constants";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import { replacePathParams } from "src/common/lib/common.lib";
import { useMutation } from "react-query";
import { deleteVideos } from "src/videos/api";

export const FormTable = ({ items, page, refetch }) => {
  const [isDelete, setIsDelete] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const listIdCurrentPage = items.map((item) => item.id);
  const { isCheckedAll, selectedIds, handleSelectItem, handleCheckAll, reset } =
    useSelectMultiple(listIdCurrentPage, page);
  const { isSuccess: isSuccessDelete, mutate } = useMutation(deleteVideos);
  useEffect(() => {
    if (selectedIds.length > 0) {
      setIsDelete(true);
    } else {
      handleCheckAll(false);
      setIsDelete(false);
    }
  }, [selectedIds]);
  const handleCancel = () => {
    handleCheckAll(false);
    setIsDelete(false);
    reset();
    onClose();
  };
  const handleDelete = () => {
    const idsDelete = { ids: selectedIds };
    mutate(idsDelete);
  };
  useEffect(() => {
    if (isSuccessDelete) {
      handleCancel();
      refetch();
    }
  }, [isSuccessDelete]);

  return (
    <Box mt="12px">
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        display={isDelete ? "flex" : "none"}
        bgColor="#FFFFCC"
        borderRadius="4px"
      >
        <Text ml="12px">
          Delete
          {selectedIds.length > 1
            ? ` ${selectedIds.length} items`
            : ` ${selectedIds.length} item`}
        </Text>
        <Button my="10px" mx="12px" colorScheme="red" onClick={onOpen} w="150px">
          Delete
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Do you really want to delete
                {selectedIds.length > 1
                  ? ` ${selectedIds.length} items`
                  : ` ${selectedIds.length} item`}
                ?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={handleCancel}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Yes, I do want to delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Table bgColor="#FFFFFF">
        <Thead>
          <Tr {...TextStyle}>
            <Td>
              <Checkbox
                isChecked={isCheckedAll}
                onChange={() => handleCheckAll(!isCheckedAll)}
              />
            </Td>
            <Td>Id</Td>
            <Td>Name</Td>
            <Td>Link</Td>
            <Td>Level</Td>
            <Td>Topic</Td>
            <Td>Time</Td>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => {
            const linkDetail = replacePathParams(EDITVIDEO_PAGE, {
              videoID: `${item.id}`,
            });
            return (
              <Tr key={item.id} {...TextStyle}>
                <Td>
                  <Checkbox
                    isChecked={selectedIds.includes(item.id)}
                    onChange={() =>
                      handleSelectItem(item.id, !selectedIds.includes(item.id))
                    }
                  />
                </Td>
                <Td>
                  <Link to={linkDetail}>{item.id}</Link>
                </Td>
                <Td>
                  <Link to={linkDetail}>
                    <Text noOfLines={1}>{item.name}</Text>
                  </Link>
                </Td>
                <Td>
                  <Link to={linkDetail}>
                    <Text noOfLines={1}>{item.link}</Text>
                  </Link>
                </Td>
                <Td>
                  <Link to={linkDetail}>{item.level.description}</Link>
                </Td>
                <Td>
                  <Link to={linkDetail}>
                    {item.videosToTopics.map((videotopic) => {
                      return (
                        <Text key={videotopic.id} noOfLines={1}>
                          {videotopic.topicKey}
                        </Text>
                      );
                    })}
                  </Link>
                </Td>
                <Td>
                  <Link to={linkDetail}>{toHHMMSS(item.length)}</Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

const TextStyle = {
  // fontFamily: "Lato",
  height: "73px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "24px",
  color: "#000000",
};
