import { toHHMMSSFFF } from "src/videos/utils";
import { Button, Icon, IconButton, Td, Tr } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FiXCircle } from "react-icons/fi";
import { TranscriptVideoType } from "src/videos/interface";

type TranscriptItemProps = {
  state: any;
  trans: TranscriptVideoType;
  index: number;
  isSelected: boolean;
  onSelect: (trans: TranscriptVideoType, index: number) => void;
  onDelete: (index: number) => void;
};
function TranscriptItem({
  state,
  trans,
  index,
  isSelected,
  onSelect,
  onDelete,
}: TranscriptItemProps) {
  useEffect(() => {
    if (index === -1) console.log(state);
  }, [state]);
  return (
    <Tr>
      <Td p="0" border="none">
        <Button
          onClick={() => onSelect(trans, index)}
          bgColor="unset"
          _hover={{ bgColor: "unset" }}
          _active={{ bgColor: "unset" }}
          _focusVisible={{ bgColor: "unset" }}
          fontWeight={isSelected ? "500" : "400"}
          p="0"
        >
          {toHHMMSSFFF(trans.offset)}
        </Button>
      </Td>
      <Td p="0" border="none">
        <Button
          justifyContent="flex-start"
          onClick={() => onSelect(trans, index)}
          bgColor="unset"
          _hover={{ bgColor: "unset" }}
          _active={{ bgColor: "unset" }}
          _focusVisible={{ bgColor: "unset" }}
          fontWeight={isSelected ? "500" : "400"}
          whiteSpace="normal"
          textAlign="unset"
        >
          {trans.text}
        </Button>
      </Td>
      <Td p="0" w="40px" border="none">
        <IconButton
          aria-label="Delete transcript"
          onClick={() => onDelete(index)}
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
    pre.state !== next.state ||
    pre.index !== next.index ||
    pre.isSelected !== next.isSelected ||
    pre.trans.text !== next.trans.text
  );
});
export default TranscriptItemMemo;
