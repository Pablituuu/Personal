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
  colorMap: Record<string, any>
  flipX: boolean
  flipY: boolean
}

const initialState: State = {
  colors: [],
  colorMap: {},
  flipX: false,
  flipY: false
}

export default function () {
  const [state, setState] = React.useState<State>(initialState)
  const editor = useEditor()
  const activeObject = useActiveObject()
  const vectorPaths = React.useRef<any>({})

  React.useEffect(() => {
    // @ts-ignore
    if (activeObject && activeObject.type === "StaticVector") {
      //@ts-ignore
      const objects = activeObject._objects[0]._objects
      const objectColors = groupBy(objects, "fill")
      vectorPaths.current = objectColors
      // @ts-ignore
      setState({ ...state, colors: Object.keys(objectColors), colorMap: activeObject.colorMap })
    }
  }, [activeObject])

  const changeBackgroundColor = (prev: string, next: string) => {
    // console.log(objects)
    // return
    const objectRef = activeObject
    // @ts-ignore
    objectRef.updateLayerColor(prev, next)
    setState({
      ...state,
      colorMap: {
        ...state.colorMap,
        [prev]: next
      }
    })
  }

  return (
    <Flex alignItems={"center"} h="100%">
      <Flex gap="0.25rem" padding="0 1rem">
        {Object.keys(state.colorMap).map((c, index) => {
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
                      backgroundColor: state.colorMap[c],
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
                        changeBackgroundColor(c, color)
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
