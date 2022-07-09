import { Box, Popover, PopoverTrigger, Portal, PopoverContent } from "@chakra-ui/react"
import { useEditor } from "@scenify/react"
import Icons from "~/components/Icons"

export default function () {
  const editor = useEditor()
  return (
    <Popover>
      <PopoverTrigger>
        <Box
          paddingLeft={"10px"}
          paddingRight={"10px"}
          borderRadius={"8px"}
          display="flex"
          flexDirection={"column"}
          _hover={{
            backgroundColor: "rgba(0,0,0,0.085)",
            cursor: "pointer"
          }}
        >
          <Icons.Uploads size={20} />
          <Box sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Order</Box>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="240px">
          <Box cursor={"pointer"} p="1rem">
            <Box onClick={() => editor.objects.sendToBack()}>Send to back</Box>
            <Box onClick={() => editor.objects.sendBackwards()}>Send backward</Box>
            <Box onClick={() => editor.objects.bringToFront()}>Bring to fron</Box>
            <Box onClick={() => editor.objects.bringForward()}>Bring forward</Box>
          </Box>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
