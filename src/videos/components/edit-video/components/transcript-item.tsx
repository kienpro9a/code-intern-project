import { toHHMMSSFFF } from "src/videos/utils";
import { Button, Icon, IconButton, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { FiXCircle } from "react-icons/fi";

function TranscriptItem({ trans, isSelected, onSelect, onDelete }) {
  return (
    <Tr>
      <Td p="0" border="none">
        <Button
          onClick={() => onSelect(trans)}
          bgColor="unset"
          _hover={{ bgColor: "unset" }}
          _active={{ bgColor: "unset" }}
          _focusVisible={{ bgColor: "unset" }}
          fontWeight={isSelected ? "500" : "400"}
          p="0"
        >
          {toHHMMSSFFF(trans.startTime)}
        </Button>
      </Td>
      <Td p="0" border="none">
        <Button
          justifyContent="flex-start"
          onClick={() => onSelect(trans)}
          bgColor="unset"
          _hover={{ bgColor: "unset" }}
          _active={{ bgColor: "unset" }}
          _focusVisible={{ bgColor: "unset" }}
          fontWeight={isSelected ? "500" : "400"}
          whiteSpace="normal"
          textAlign="unset"
        >
          {trans.content}
        </Button>
      </Td>
      <Td p="0" w="40px" border="none">
        <IconButton
          aria-label="Delete transcript"
          onClick={() => onDelete(trans.id)}
          icon={<Icon as={FiXCircle} w="22px" h="22px" />}
          isRound={true}
          bgColor="unset"
        />
      </Td>
    </Tr>
  );
}
const TranscriptItemMemo = React.memo(TranscriptItem, (pre, next) => {
  return !(
    pre.trans !== next.trans ||
    pre.isSelected !== next.isSelected ||
    pre.trans.text !== next.trans.text
  );
});
export default TranscriptItemMemo;
