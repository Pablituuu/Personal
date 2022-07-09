import { Box, Button, Popover, PopoverTrigger, PopoverContent, Portal } from "@chakra-ui/react"
import Scrollbar from "@scenify/react-custom-scrollbar"
import { useEditor, useZoomRatio } from "@scenify/react"

export default function () {
  const editor = useEditor()
  const zoomRatio = useZoomRatio() as number
  const zoomValues = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.55, 0.6, 0.65, 0.7]
  return (
    <Box style={{ position: "absolute", right: "1.5rem", bottom: "1.5rem", display: "flex" }}>
      {/* <Button leftIcon={<Icons.Less size={12} />} onClick={() => editor.zoom.zoomOut()}></Button> */}
      <Popover placement="top">
        <PopoverTrigger>
          <Button>{Math.trunc(zoomRatio * 100)}%</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="80px" h="240px">
            <Scrollbar>
              {zoomValues.map((zv) => (
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    editor.zoom.zoomToRatio(zv)
                  }}
                  key={zv}
                >
                  {Math.round(zv * 100) + "%"}
                </Button>
              ))}
            </Scrollbar>
          </PopoverContent>
        </Portal>
      </Popover>
      {/* <Button leftIcon={<Icons.Plus size={12} />} onClick={() => editor.zoom.zoomIn()}></Button> */}
    </Box>
  )
}
