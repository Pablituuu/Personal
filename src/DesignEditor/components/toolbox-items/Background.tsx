import { Box, Flex, IconButton } from "@chakra-ui/react"
import { useEditor } from "@scenify/react"
import React from "react"
import Icons from "~/components/Icons"

const initialState: State = {
  color: "#000000",
  flipX: false,
  flipY: false
}
interface State {
  color: string
  flipX: boolean
  flipY: boolean
}

export default function () {
  const editor = useEditor()
  const [state, setState] = React.useState<State>(initialState)

  const handleFlipX = React.useCallback(() => {
    if (editor) {
      editor.objects.update({
        flipX: !state.flipX
      })
      setState({ ...state, flipX: !state.flipX })
    }
  }, [editor, state])

  const handleFlipY = React.useCallback(() => {
    if (editor) {
      editor.objects.update({
        flipY: !state.flipY
      })
      setState({ ...state, flipY: !state.flipY })
    }
  }, [editor, state])

  return (
    <Flex alignItems={"center"} h="100%">
      <IconButton variant={"ghost"} aria-label="Search database" icon={<Icons.Circle size={20} />} />

      <Box onClick={handleFlipX} sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Icons.FlipHorizontal size={20} />
        <Box sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Flip X</Box>
      </Box>

      <Box onClick={handleFlipY} sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Icons.FlipVertical size={20} />
        <Box sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Flip Y</Box>
      </Box>
    </Flex>
  )
}
