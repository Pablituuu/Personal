import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import Icons from "~/components/Icons"
import { useEditor } from "@scenify/react"

interface State {
  flipX: boolean
  flipY: boolean
}

const initialState: State = {
  flipX: false,
  flipY: false
}

export default function () {
  const [state, setState] = React.useState<State>(initialState)
  const editor = useEditor()

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
    <Flex>
      <Box
        paddingLeft={"10px"}
        paddingRight={"10px"}
        onClick={handleFlipX}
        borderRadius={"8px"}
        display="flex"
        flexDirection={"column"}
        _hover={{
          backgroundColor: "rgba(0,0,0,0.085)",
          cursor: "pointer"
        }}
      >
        <Icons.FlipHorizontal size={20} />
        <Box sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Flip X</Box>
      </Box>
      <Box
        borderRadius={"8px"}
        _hover={{
          backgroundColor: "rgba(0,0,0,0.085)",
          cursor: "pointer"
        }}
        paddingRight={"10px"}
        paddingLeft={"10px"}
        onClick={handleFlipY}
        display="flex"
        flexDirection={"column"}
      >
        <Icons.FlipVertical size={20} />
        <Box sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Flip Y</Box>
      </Box>
    </Flex>
  )
}
