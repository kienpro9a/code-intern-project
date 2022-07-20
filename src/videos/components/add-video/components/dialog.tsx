import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { VIDEO_PAGE } from "src/common/constants/routes.constants";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { addVideo } from "src/videos/api";
import { useEffect } from "react";

export const CancelDialog = ({ initialState, setState }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleCancel = () => {
    setState(initialState);
    navigate(VIDEO_PAGE);
  };
  return (
    <>
      <Button
        w={{ base: "80px", md: "173px" }}
        h="48px"
        px={{ base: "20px", md: "63px" }}
        py="16px"
        bgColor="#9B9B9B"
        onClick={onOpen}
      >
        <Text fontSize="18px" fontWeight="700" lineHeight="28px" color="white">
          Cancel
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm cancel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Do you want to cancel?</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleCancel}>
              Yes, I do want to cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const SaveDialog = ({ initialState, setState, state }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const checkEmptyValue = (object: {}) => {
    const valueFromArray = Object.values(object);
    return valueFromArray.includes("") || valueFromArray.includes([]);
  };
  const { isSuccess, mutate } = useMutation(addVideo);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setState(initialState);
      navigate(VIDEO_PAGE);
    }
  }, [isSuccess]);
  const handleSave = () => {
    if (checkEmptyValue(state)) {
      toast({
        title: "Form missing",
        description: "You haven't fill in something",
        status: "warning",
        isClosable: true,
      });
    } else {
      mutate(state);
    }
  };
  return (
    <>
      <Button
        w={{ base: "80px", md: "173px" }}
        h="48px"
        px={{ base: "20px", md: "63px" }}
        py="16px"
        bgColor="#9B9B9B"
        onClick={onOpen}
      >
        <Text fontSize="18px" fontWeight="700" lineHeight="28px" color="white">
          Save
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm save</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Do you want to save?</Text>
            <Text>make sure to fill in all required fields</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Yes, I do want to save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
