import React from "react"
import { Flex, Divider, Popover, PopoverTrigger, Portal, PopoverContent } from "@chakra-ui/react"
import { useActiveObject, useEditor } from "@scenify/react"
//@ts-ignore
import groupBy from "lodash/groupBy"
import { HexColorPicker } from "react-colorful"
import Flip from "./Flip"
import Alignment from "./Alignment"

interface State {
  colors: string[]
  flipX: boolean
  flipY: boolean
}

const initialState: State = {
  colors: [],
  flipX: false,
  flipY: false
}

export default function () {
  const [state, setState] = React.useState<State>(initialState)
  const editor = useEditor()
  const activeObject = useActiveObject()
  const vectorPaths = React.useRef<any>({})

  React.useEffect(() => {
    if (activeObject) {
      //@ts-ignore
      const objects = activeObject._objects[0]._objects
      const objectColors = groupBy(objects, "fill")
      vectorPaths.current = objectColors
      setState({ ...state, colors: Object.keys(objectColors) })
    }
  }, [activeObject])

  const changeBackgroundColor = (next: any, prev: any, index: any) => {
    const current: any[] = vectorPaths.current[prev]
    if (current) {
      current.forEach((c) => {
        c.fill = next
      })
      const currentColors = [...state.colors]
      currentColors[index] = next
      setState({ ...state, colors: currentColors })
      vectorPaths.current[next] = current
    }
    editor.canvas.requestRenderAll()
  }
  return (
    <Flex alignItems={"center"} h="100%">
      <Flex gap="0.25rem" padding="0 1rem">
        {state.colors.map((c, index) => {
          return (
            <Popover key={index}>
              <PopoverTrigger>
                <div>
                  <div
                    style={{
                      height: "22px",
                      width: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      backgroundColor: c,
                      border: "1px solid #dedede",
                      borderRadius: "50%"
                    }}
                  ></div>
                </div>
              </PopoverTrigger>
              <Portal>
                <PopoverContent w="50px">
                  <div
                    style={{
                      padding: "1rem",
                      background: "#ffffff",
                      width: "200px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      textAlign: "center"
                    }}
                  >
                    <HexColorPicker
                      onChange={(color) => {
                        changeBackgroundColor(color, c, index)
                      }}
                    />
                  </div>
                </PopoverContent>
              </Portal>
            </Popover>
          )
        })}
      </Flex>
      <Divider orientation="vertical" />
      <Flip />
      <Divider orientation="vertical" />
      <Alignment />
    </Flex>
  )
}
