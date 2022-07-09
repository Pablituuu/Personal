import {
  Flex,
  Menu,
  MenuList,
  Box,
  Button,
  IconButton,
  useDisclosure,
  Input,
  Spacer,
  MenuButton,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  PopoverFooter,
  Text
} from "@chakra-ui/react"
import { useEditor } from "@scenify/react"
import { useRef } from "react"
import { useSelector } from "react-redux"
import Icons from "~/components/Icons"
import { useAppDispatch, useAppSelector } from "~/hooks/useRedux"
import { selectUser } from "~/store/user/selector"
import AuthModal from "./modals/AuthModal"

function Header() {
  const inputFile = useRef<HTMLInputElement>(null)
  const editor = useEditor()
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: iOpen, onOpen: oOpen, onClose: oClose } = useDisclosure()

  const handleFileInput = () => {}
  const handleLogout = () => {}
  const handleSave = () => {}
  const handleNew = () => {}
  const handleDownload = () => {}
  const handleExport = () => {}
  const handleShare = (type: string, email: string | null) => {}

  const user = useSelector((state: any) => state.user)
  console.log(user)

  return (
    <Box fontSize={"Roboto"}>
      <Flex
        sx={{
          borderBottom: "1px solid #d0d0d0",
          height: "34px",
          paddingLeft: "0.5rem"
        }}
      >
        <AuthModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <input onChange={handleFileInput} type="file" id="file" ref={inputFile} style={{ display: "none" }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <IconButton color={"red"} size="sm" variant={"ghost"} aria-label="Share" icon={<Icons.Logo size={28} />} />
          <Input size="sm" placeholder="Untitled Project 1" sx={{ width: "180px", height: "20px" }}></Input>
        </Box>
        {
          <Box display={"flex"} w={"100%"}>
            <Spacer />
            <Button
              size="sm"
              fontSize={"small"}
              variant={"ghost"}
              aria-label="Share"
              leftIcon={<Icons.Save size={19} />}
              sx={{
                ":hover": {
                  backgroundColor: "rgba(0,0,0,0.085)",
                  cursor: "pointer"
                }
              }}
              onClick={handleSave}
            >
              SAVE
            </Button>
            {/* <Link to={`/temp_${result}`}> */}
            <Button
              size="sm"
              fontSize={"small"}
              variant={"ghost"}
              aria-label="Share"
              leftIcon={<Icons.New size={20} />}
              borderLeft="1px solid rgb(232, 232, 232)"
              colorScheme={"facebook"}
              onClick={handleNew}
            >
              NEW
            </Button>
            {/* </Link> */}
            <Button
              size="sm"
              fontSize={"small"}
              variant={"ghost"}
              aria-label="Share"
              w="120px"
              leftIcon={<Icons.Download size={22} />}
              borderLeft="1px solid rgb(232, 232, 232)"
              onClick={handleDownload}
            >
              DOWNLOAD
            </Button>
            <Button
              size="sm"
              fontSize={"small"}
              variant={"ghost"}
              aria-label="Share"
              w="100px"
              leftIcon={<Icons.ImportDoc size={19} />}
              borderLeft="1px solid rgb(232, 232, 232)"
              onClick={() => inputFile.current?.click()}
            >
              IMPORT
            </Button>
            <Button
              size="sm"
              fontSize={"small"}
              variant={"ghost"}
              aria-label="Share"
              w="100px"
              onClick={handleExport}
              leftIcon={<Icons.ExportDoc size={19} />}
              borderLeft="1px solid rgb(232, 232, 232)"
            >
              EXPORT
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button
                  size="sm"
                  fontSize={"small"}
                  variant={"ghost"}
                  aria-label="Share"
                  w="100px"
                  leftIcon={<Icons.Share size={21} />}
                  borderLeft="1px solid rgb(232, 232, 232)"
                >
                  SHARE
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent w="250px">
                  <PopoverArrow />
                  <PopoverHeader>PROJECT SHARE OPTIONS</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody display="flex">
                    <Button variant={"ghost"} onClick={() => handleShare("FACEBOOK", "")}>
                      Facebook
                    </Button>
                    <Spacer />
                    <Button variant={"ghost"} onClick={() => handleShare("LINKEDIN", "")}>
                      Linkedin
                    </Button>
                  </PopoverBody>
                  <PopoverFooter>
                    <Text>Share on email</Text>
                    <Flex>
                      <Input placeholder="email"></Input>
                      <Button color="white" backgroundColor={"orange"} onClick={() => handleShare("EMAIL", "email")}>
                        Send
                      </Button>
                    </Flex>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button
                  size="sm"
                  fontSize={"small"}
                  variant={"ghost"}
                  aria-label="Share"
                  leftIcon={<Icons.Help size={20} />}
                  borderLeft="1px solid rgb(232, 232, 232)"
                >
                  HELP
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>HELP & SUPPORT</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody display={"flex"} flexDirection="column">
                    <Button variant={"unstyled"}>Chat with Us</Button>
                    <Button variant={"unstyled"}>FAQ & Tutorials</Button>
                    <Button onClick={oOpen} variant={"unstyled"}>
                      Keyboard Shortcut
                    </Button>
                    <Modal isOpen={iOpen} onClose={oClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          <Text borderBottom={"1px solid rgb(232, 232, 232)"} fontWeight={"bold"}>
                            KEYBOARD SHORTCUTS
                          </Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <Flex flexDirection={"row"}>
                          <Box>
                            <Text fontWeight={"bold"} paddingLeft="10px">
                              Basic Actions
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>A</label>-
                              Select All Objects
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>D</label>-
                              Duplicate Selection
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>E</label>-
                              Clear All Objects
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>S</label>-
                              Save Project
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>Z</label>-
                              Undo
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>Y</label>-
                              Redo
                            </Text>
                            <Text padding={"10px"}>
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>Del</label> -
                              Delete Object
                            </Text>
                          </Box>
                          <Box paddingLeft={"10px"} borderLeft={"2px solid rgb(232, 232, 232)"}>
                            <Text fontWeight={"bold"} paddingLeft="10px">
                              Text Formatting
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>B</label>-
                              Text Bold
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>I</label>-
                              Text Italic
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>U</label>-
                              Text Underline
                            </Text>
                            <Spacer />
                            <Text paddingTop={"10px"} fontWeight={"bold"} paddingLeft="10px">
                              Object Movement
                            </Text>
                            <Box>
                              Arrow key
                              <Icons.UpArrow size={10} />- Object Move Up
                            </Box>
                            <Text padding={"10px"}>
                              Arrow key
                              <Icons.DownArrow size={10} />- Object Move Down
                            </Text>
                            <Text padding={"10px"}>
                              Arrow key
                              <Icons.LeftArrow size={10} />- Object Move Left
                            </Text>
                            <Text padding={"10px"}>
                              Arrow key
                              <Icons.RightArrow size={10} />- Object Move Right
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>-</label>-
                              Zoom out
                            </Text>
                            <Text padding={"10px"}>
                              Ctrl +
                              <label style={{ background: "#e4e4e4", padding: "5px", fontWeight: "bold" }}>+</label>-
                              Zoom In
                            </Text>
                          </Box>
                        </Flex>
                      </ModalContent>
                    </Modal>
                    <Button variant={"unstyled"}>Report a Bug</Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
            <Button borderLeft="1px solid rgb(232, 232, 232)" variant={"ghost"} size="sm" onClick={() => onOpen()}>
              Signin
            </Button>
          </Box>
        }
      </Flex>
    </Box>
  )
}

export default Header
