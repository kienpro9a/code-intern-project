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
// import { VIDEO_PAGE } from "src/common/constants/routes.constants";
// import { useNavigate } from "react-router-dom";

export const SaveDialog = ({ state }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const checkEmptyValue = (object: {}) => {
    const valueFromArray = Object.values(object);
    return valueFromArray.includes("") || valueFromArray.includes(0);
  };
  const handleSave = () => {
    console.log(state);
    if (checkEmptyValue(state)) {
      toast({
        title: "Form missing",
        description: "You haven't fill in something",
        status: "warning",
        isClosable: true,
      });
    } else {
      console.log(state);
      // mutate(state);
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
