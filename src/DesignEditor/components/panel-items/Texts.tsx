import { Box, Text, Flex, Button, Input } from "@chakra-ui/react"
import { useEditor } from "@scenify/react"
import Scrollbars from "@scenify/react-custom-scrollbar"
// import axios from "axios"
import { useEffect, useState } from "react"

function Texts() {
  const editor = useEditor()
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
  // }, [])

  const addText = (font: any, text: any) => {
    if (!text) {
      text = "Hello Drawify"
    }
    const options = {
      type: "StaticText",
      width: 160,
      name: "Text",
      fontWeight: 700,
      fontFamily: font,
      textAlign: "center",
      fontSize: 100,
      text: text,
      fontURL: "https://fonts.gstatic.com/s/astloch/v14/TuGRUVJ8QI5GSeUjq9wRzMtkH1Q.ttf",
      metadata: {}
    }
    if (editor) {
      editor.objects.add(options)
    }
  }

  const [text, setText] = useState<any>("")

  return (
    <Box padding={"20px"} flexDirection="column" sx={{ width: "320px" }}>
      <Box h="100px" borderRadius={"8px"} border={"1px solid rgb(232, 232, 232)"} display="flex">
        <Input
          h="80px"
          padding={"15px"}
          variant={"unstyled"}
          type="text"
          placeholder="Type your Text"
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
      <Box display="flex" flexWrap="wrap" h="85%">
        <Scrollbars>
          {textData.map((font: any, index: number) => {
            return (
              <Box alignContent={"center"} padding={"10px"} key={index}>
                <Button
                  boxSize={"auto"}
                  border="1px solid rgb(232, 232, 232)"
                  variant={"unstyled"}
                  onClick={() => addText(font.family, text)}
                  w="240px"
                >
                  <Flex background={"#f9f9f9"} padding={"10px"} align={"start"} flexDirection={"column"}>
                    <Text fontFamily={font.family} as="em">
                      {text == "" ? "Type your Text" : text}
                    </Text>
                    <Text fontFamily={font.family} as="em">
                      {font.family}
                    </Text>
                  </Flex>
                </Button>
              </Box>
            )
          })}
        </Scrollbars>
      </Box>
    </Box>
  )
}

export default Texts
