import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Flex,
  Text,
  Popover,
  Portal,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react"
import { useActiveObject, useEditor } from "@scenify/react"
import Icons from "~/components/Icons"
import { HexColorPicker } from "react-colorful"
import Flip from "./Flip"
import Alignment from "./Alignment"

const initialState: State = {
  color: "#000000",
  fontFamily: "Arial",
  fontSize: 12,
  textAlign: "left",
  flipX: false,
  flipY: false,
  fontWeight: "regular",
  fontStyle: "normal",
  underline: false
}
interface State {
  fontFamily: string
  color: string
  fontSize: number
  textAlign: string
  fontWeight: "regular" | "bold"
  fontStyle: string
  underline: boolean
  flipX: boolean
  flipY: boolean
}

const ITEMS = [
  { label: 8 },
  { label: 10 },
  { label: 12 },
  { label: 14 },
  { label: 16 },
  { label: 18 },
  { label: 20 },
  { label: 22 },
  { label: 24 },
  { label: 32 },
  { label: 36 },
  { label: 64 },
  { label: 128 }
]

const getTextOptions = (object: any): State => {
  const { fontFamily, fontSize, fill, fontWeight, fontStyle, textAlign, underline, flipX, flipY } = object
  return { fontFamily, fontSize, color: fill, textAlign, fontWeight, fontStyle, underline, flipX, flipY }
}

export default function () {
  const editor = useEditor()
  const [state, setState] = React.useState<State>(initialState)
  const activeObject = useActiveObject()
  const [textData, setTextData] = useState([])

  // useEffect(() => {
  //   const query = {
  //     limit: 0,
  //     page: 0,
  //     query: {
  //       published1: true
  //     }
  //   }
  //   axios
  //     .post("/v1/font/search", query)
  //     .then((data: any) => {
  //       textData[0] == undefined ? setTextData(data.data.fonts) : null
  //     })
  //     .catch((e) => {
  //       return e
  //     })
  // })

  const handleFontSize = React.useCallback(
    (value: number) => {
      if (editor) {
        editor.objects.update({
          fontSize: value
        })
        setState({ ...state, fontSize: value })
      }
    },
    [editor, state]
  )

  const handleFontWeight = React.useCallback(() => {
    if (editor) {
      const updatedFontWeight = state.fontWeight === "regular" ? "bold" : "regular"
      editor.objects.update({
        fontWeight: updatedFontWeight
      })
      setState({ ...state, fontWeight: updatedFontWeight })
    }
  }, [editor, state])

  const handleFontUnderline = React.useCallback(() => {
    if (editor) {
      const updatedFontUnderline = !state.underline
      editor.objects.update({
        underline: updatedFontUnderline
      })
      setState({ ...state, underline: updatedFontUnderline })
    }
  }, [editor, state])

  const handleFontStyle = React.useCallback(() => {
    if (editor) {
      const updatedFontStyle = state.fontStyle === "normal" ? "italic" : "normal"
      editor.objects.update({
        fontStyle: updatedFontStyle
      })
      setState({ ...state, fontStyle: updatedFontStyle })
    }
  }, [editor, state])

  const handleTextAlignLeft = React.useCallback(() => {
    if (editor) {
      const updatedTextAlign = "left"
      editor.objects.update({
        textAlign: updatedTextAlign
      })
      setState({ ...state, textAlign: updatedTextAlign })
    }
  }, [editor, state])

  const handleTextAlignCenter = React.useCallback(() => {
    if (editor) {
      const updatedTextAlign = "center"
      editor.objects.update({
        textAlign: updatedTextAlign
      })
      setState({ ...state, textAlign: updatedTextAlign })
    }
  }, [editor, state])

  const handleTextAlignRight = React.useCallback(() => {
    if (editor) {
      const updatedTextAlign = "right"
      editor.objects.update({
        textAlign: updatedTextAlign
      })
      setState({ ...state, textAlign: updatedTextAlign })
    }
  }, [editor, state])

  const handleTextJustify = React.useCallback(() => {
    if (editor) {
      const updatedTextAlign = "justify"
      editor.objects.update({
        textAlign: updatedTextAlign
      })
      setState({ ...state, textAlign: updatedTextAlign })
    }
  }, [editor, state])

  const changeBackgroundColor = (next: any, prev: any) => {
    editor.objects.update({ fill: next })
    setState({ ...state, color: next })
    editor.canvas.requestRenderAll()
  }

  React.useEffect(() => {
    if (activeObject) {
      const options = getTextOptions(activeObject)
      setState({ ...state, color: options.color })
      setState(options)
    } else {
      setState(initialState)
    }
  }, [activeObject])

  const handleFontFamily = React.useCallback(
    (typeFont: any) => {
      if (editor) {
        editor.objects.update({
          fontFamily: typeFont
        })
        setState({ ...state, fontFamily: typeFont })
      }
    },
    [editor, state]
  )

  return (
    <Flex alignItems={"center"} h="100%">
      <Box padding={"10px"}>
        <Popover>
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
                  backgroundColor: state.color,
                  border: "1px solid #dedede",
                  borderRadius: "50%"
                }}
              ></div>
            </div>
          </PopoverTrigger>
          <Portal>
            <PopoverContent w="230px">
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
                    changeBackgroundColor(color, state.color)
                  }}
                />
              </div>
            </PopoverContent>
          </Portal>
        </Popover>
      </Box>
      <Menu>
        <MenuButton w="100px" as={IconButton} variant="outline">
          {state.fontFamily}
        </MenuButton>
        <MenuList>
          {textData.map((font: any, index: number) => {
            return (
              <MenuItem key={index} onClick={() => handleFontFamily(font.family)} _hover={{ background: "white" }}>
                {font.family}
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
      <Popover>
        <PopoverTrigger>
          <Button variant="ghost" paddingRight={"10px"} paddingLeft={"10px"}>
            {String(Math.round(state.fontSize))}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="50px">
            {ITEMS.map((item, index) => (
              <Button
                variant={"ghost"}
                onClick={() => {
                  handleFontSize(item.label)
                }}
                key={index}
              >
                {item.label}
              </Button>
            ))}
          </PopoverContent>
        </Portal>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <Box
            borderRadius={"8px"}
            _hover={{
              backgroundColor: "rgba(0,0,0,0.085)",
              cursor: "pointer"
            }}
            paddingRight={"10px"}
            paddingLeft={"10px"}
            sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
          >
            <Icons.AlignLeft size={20} />
            <Box sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Align</Box>
          </Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="162px" display={"flex"} flexDirection="column">
            <Text align={"center"}>TEXT ALIGNMENTS</Text>
            <Box>
              <IconButton
                onClick={() => handleTextAlignLeft()}
                variant={"ghost"}
                aria-label="Search database"
                icon={<Icons.AlignLeft size={20} />}
              />
              <IconButton
                onClick={() => handleTextAlignCenter()}
                variant={"ghost"}
                aria-label="Search database"
                icon={<Icons.AlignCenter size={20} />}
              />
              <IconButton
                onClick={() => handleTextAlignRight()}
                variant={"ghost"}
                aria-label="Search database"
                icon={<Icons.AlignRight size={20} />}
              />
              <IconButton
                onClick={() => handleTextJustify()}
                variant={"ghost"}
                aria-label="Search database"
                icon={<Icons.Justify size={20} />}
              />
            </Box>
          </PopoverContent>
        </Portal>
      </Popover>

      <Box
        _hover={{
          backgroundColor: "rgba(0,0,0,0.085)",
          cursor: "pointer"
        }}
        alignContent="center"
        borderRadius={"8px"}
        paddingRight={"10px"}
        paddingLeft={"10px"}
        flexDirection={"column"}
      >
        <Text align={"center"}>Aa</Text>
        <Text fontSize={10}>Case</Text>
      </Box>

      <Box
        _hover={{
          backgroundColor: "rgba(0,0,0,0.085)",
          cursor: "pointer"
        }}
        borderRadius={"8px"}
        paddingRight={"10px"}
        paddingLeft={"10px"}
        onClick={handleFontWeight}
        flexDirection={"column"}
      >
        <Text align="center">B</Text>
        <Text fontSize={10}>Bold</Text>
      </Box>

      <Box
        _hover={{
          backgroundColor: "rgba(0,0,0,0.085)",
          cursor: "pointer"
        }}
        borderRadius={"8px"}
        paddingRight={"10px"}
        paddingLeft={"10px"}
        onClick={handleFontStyle}
        flexDirection={"column"}
      >
        <Text align="center">I</Text>
        <Text fontSize={10}>Italic</Text>
      </Box>

      <Box
        _hover={{
          backgroundColor: "rgba(0,0,0,0.085)",
          cursor: "pointer"
        }}
        borderRadius={"8px"}
        paddingRight={"5px"}
        paddingLeft={"5px"}
        onClick={handleFontUnderline}
        flexDirection={"column"}
      >
        <Text align={"center"} textDecoration={"underline"}>
          U
        </Text>
        <Text fontSize={10}>Underline</Text>
      </Box>

      <Divider orientation="vertical" />
      <Flip />
      <Divider orientation="vertical" />
      <Alignment />
    </Flex>
  )
}
