import {
  Box,
  Text,
  Flex,
  Button,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent
} from "@chakra-ui/react"
import { useEditor, useActiveObject } from "@scenify/react"
import { useEffect, useRef, useState } from "react"
import { HexColorPicker } from "react-colorful"

interface Dimension {
  height: number
  width: number
}

function Settings() {
  const [state, setState] = useState<any>("")
  const editor = useEditor()
  const vectorPaths = useRef<any>({})
  const activeObject = useActiveObject()
  const [value, setValue] = useState<Dimension>({
    height: 768,
    width: 1024
  })

  const changeOrientation = () => {
    setValue({ ...value, width: value.height, height: value.width })
    editor.frame.resize({ height: value.height, width: value.width })
  }

  const applyCustomSize = () => {
    editor.frame.resize({ height: value.height, width: value.width })
  }

  useEffect(() => {
    if (editor) {
      const background: any = [editor.frame.background.fill]
      setState(background)
    }
  }, [editor])

  const changeBackgroundColor = (next: any, prev: any) => {
    editor.frame.setBackgroundColor(next)
    setState(next)
    editor.canvas.requestRenderAll()
  }

  return (
    <Flex padding={"20px"} w="320px" flexDirection={"column"}>
      <Flex flexDirection="row" marginBottom="10px">
        <Flex alignItems="center" flexDirection={"column"}>
          <Text fontSize="14px">Size</Text>
          <Text fontSize="12px">163x92 mm</Text>
        </Flex>
        <Spacer />
        <Select w="200px" placeholder="Select option">
          <option>hola</option>
        </Select>
      </Flex>
      <Box>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Customize
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel display={"flex"} flexDirection="column">
              <Text paddingBottom={"10px"}>Custom Size</Text>
              <Box paddingBottom={"10px"} alignItems={"center"} display={"flex"} flexDirection="row">
                <Text paddingRight={"15px"}>Width</Text>
                <NumberInput size="sm" defaultValue={value.width} w="80px" clampValueOnBlur={false}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper onClick={(e: any) => setValue({ ...value, width: value.width + 1 })} />
                    <NumberDecrementStepper onClick={(e: any) => setValue({ ...value, width: value.width - 1 })} />
                  </NumberInputStepper>
                </NumberInput>
                <Spacer />
                <Text paddingRight={"10px"}>Unit</Text>
                <Menu>
                  <MenuButton as={Button} variant="outline">
                    mm
                  </MenuButton>
                  <MenuList>
                    <MenuItem>mm</MenuItem>
                    <MenuItem>cm</MenuItem>
                    <MenuItem>inch</MenuItem>
                    <MenuItem>pixel</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box
                paddingBottom={"10px"}
                borderBottom="1px solid rgb(232, 232, 232)"
                alignItems={"center"}
                display={"flex"}
                flexDirection="row"
              >
                <Text paddingRight={"10px"}>Height</Text>
                <NumberInput size="sm" defaultValue={value.height} w="80px" clampValueOnBlur={false}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper onClick={(e: any) => setValue({ ...value, height: value.height + 1 })} />
                    <NumberDecrementStepper onClick={(e: any) => setValue({ ...value, height: value.height - 1 })} />
                  </NumberInputStepper>
                </NumberInput>
                <Spacer />
                <Button onClick={applyCustomSize} background={"orange"} variant={"outline"} w="105px">
                  Change Sizes
                </Button>
              </Box>
              <Box>
                <Flex paddingBottom={"10px"} flexDirection={"row"} paddingTop={"10px"}>
                  <Button size="sm" onClick={changeOrientation}>
                    Change Orientation
                  </Button>
                  <Spacer />
                  <Box alignItems={"center"}>
                    <Text paddingLeft="10px" paddingBottom={"10px"} fontSize={"13px"}>
                      Background Color
                    </Text>
                    <Flex padding="0 3rem">
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
                                backgroundColor: state,
                                border: "1px solid #dedede",
                                borderRadius: "50%"
                              }}
                            ></div>
                          </div>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent>
                            <div
                              style={{
                                padding: "1rem"
                              }}
                            >
                              <HexColorPicker
                                onChange={(color) => {
                                  changeBackgroundColor(color, state)
                                }}
                              />
                            </div>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  )
}

export default Settings
