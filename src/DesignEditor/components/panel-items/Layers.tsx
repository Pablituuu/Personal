import React from "react"
import { Box, Text, Flex, IconButton, Image, Spacer } from "@chakra-ui/react"
import { useEditor, useObjects } from "@scenify/react"
import Icons from "~/components/Icons"

function Layers() {
  const objects = useObjects() as any[]
  const editor = useEditor()
  return (
    <Box padding={"20px"} flexDirection="column" sx={{ width: "320px" }}>
      {objects.map((object, index) => (
        <LayerItem key={index} id={object.id} name={object.name} visible={object.visible} />
      ))}
      {objects[0] == undefined ? (
        <Box borderRadius={"8px"} background={"#f9f9f9"} paddingTop="1rem" paddingBottom="1rem">
          <Text alignItems="center" alignContent={"center"} justifyItems="center" justifyContent={"center"}>
            No layers Results Found
          </Text>
        </Box>
      ) : null}
    </Box>
  )
}

interface Props {
  name: string
  visible: boolean
  id: string
}

interface State extends Props {}

function LayerItem({ name, visible, id }: Props) {
  const editor = useEditor()
  const [state, setState] = React.useState<State>({
    name,
    visible,
    id
  })

  const handleVisibility = () => {
    //@ts-ignore
    editor.objects.updateById(id, { visible: !state.visible })
    setState({ ...state, visible: !state.visible })
  }
  const handleCenterPosition = () => {
    editor.objects.alignCenter(id)
    editor.objects.alignMiddle(id)
  }
  const handleLayerUp = () => {
    editor.objects.sendToBack(id)
  }
  const handleLayerDown = () => {
    editor.objects.bringToFront(id)
  }

  const handleRemove = () => {
    editor.objects.removeById(id)
  }

  return (
    <Flex borderBottom="1px solid #d0d0d0">
      <Image></Image>
      <Text fontFamily={"roboto"} fontSize="12">
        {name}
      </Text>
      <Spacer />
      <IconButton
        size="xs"
        onClick={handleVisibility}
        aria-label="Search database"
        variant={"ghost"}
        icon={<Icons.Eye size={12} />}
      />
      <IconButton
        size="xs"
        onClick={handleCenterPosition}
        aria-label="Search database"
        variant={"ghost"}
        icon={<Icons.Center size={12} />}
      />
      <IconButton
        size="xs"
        onClick={handleLayerUp}
        aria-label="Search database"
        variant={"ghost"}
        icon={<Icons.CircleUp size={12} />}
      />
      <IconButton
        size="xs"
        onClick={handleLayerDown}
        aria-label="Search database"
        variant={"ghost"}
        icon={<Icons.CircleDown size={12} />}
      />
      <IconButton size="xs" aria-label="Search database" variant={"ghost"} icon={<Icons.Padlock size={12} />} />
      <IconButton
        size="xs"
        color="orange"
        aria-label="Search database"
        variant={"ghost"}
        icon={<Icons.X size={13} />}
        onClick={handleRemove}
      />
    </Flex>
  )
}
export default Layers
