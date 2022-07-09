import React, { useCallback, useEffect, useReducer, useRef } from "react"
import { Box, Text, Flex, Button, Input, IconButton, Image, Spacer } from "@chakra-ui/react"
import { useEditor, useObjects } from "@scenify/react"
import Icons from "~/components/Icons"
// import axios from "axios"
import Scrollbar from "@scenify/react-custom-scrollbar"
import LoadMore from "~/components/Icons/LoadMore"
// import { Link } from "react-router-dom"

function Layers() {
  const imgReducer = (state: any, action: any) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, images: state.images.concat(action.images) }
      default:
        return state
    }
  }

  const pageReducer = (state: any, action: any) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 1 }
      default:
        return state
    }
  }

  let bottomBoundaryRef = useRef(null)
  const editor = useEditor()
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 })
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true })

  const handleImport = (file: any) => {
    editor.design.importFromJSON(JSON.parse(JSON.stringify(file)))
  }

  useEffect(() => {
    imgDispatch({ type: "FETCHING_IMAGES", fetching: true })

    const query: any = {
      page: pager.page,
      limit: 10
    }
    // axios
    //   .post("/v1/templates/public", query)
    //   .then((data: any) => {
    //     const images = data.data.templates
    //     imgDispatch({ type: "STACK_IMAGES", images: images })
    //     imgDispatch({ type: "FETCHING_IMAGES", fetching: false })
    //   })
    //   .catch((e) => {
    //     imgDispatch({ type: "FETCHING_IMAGES", fetching: false })
    //     return null
    //   })
  }, [imgDispatch, pager.page])

  const scrollObserver = useCallback(
    (node: any) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            pagerDispatch({ type: "ADVANCE_PAGE" })
          }
        })
      }).observe(node)
    },
    [pagerDispatch]
  )

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current)
    }
  }, [scrollObserver, bottomBoundaryRef])

  const handleChangePanel = (type: any) => {}

  return (
    <Box color="#707070" fontSize={"1rem"} fontFamily={"Roboto"} padding={"20px"} w="320px">
      <Box
        borderRadius={"4px"}
        border={"1px solid rgb(232, 232, 232)"}
        position={"relative"}
        display="flex"
        alignItems={"center"}
      >
        <Input variant={"unstyled"} type="text" placeholder="Search your Drawify" />
        <Button variant={"unstyled"} leftIcon={<Icons.Search size={19} />}></Button>
      </Box>
      <Flex padding={"10px"}>
        <Box
          display="flex"
          flexDirection={"row"}
          alignItems={"center"}
          paddingRight={"30px"}
          onClick={() => handleChangePanel("all")}
          _hover={{ cursor: "pointer", color: "#ff5d13", borderBottom: "3px solid" }}
        >
          <Icons.Search size={12} />
          <Text paddingLeft={"10px"}>All</Text>
        </Box>
        <Box
          alignItems={"center"}
          display="flex"
          flexDirection={"row"}
          onClick={() => handleChangePanel("favorite")}
          paddingRight="20px"
          _hover={{ cursor: "pointer", color: "#ff5d13", borderBottom: "3px solid" }}
        >
          <Icons.Love size={12} />
          <Text paddingLeft={"10px"}>Favorite</Text>
        </Box>
        <Box
          alignItems={"center"}
          display="flex"
          flexDirection={"row"}
          onClick={() => handleChangePanel("recent")}
          _hover={{ cursor: "pointer", color: "#ff5d13", borderBottom: "3px solid" }}
        >
          <Icons.Clock size={12} />
          <Text paddingLeft={"10px"}>Recent</Text>
        </Box>
      </Flex>
      <Flex h="88%" flexWrap="wrap">
        <Scrollbar>
          <Box>
            {/* {imgData.images.map((img: any, index: any) => {
              return (
                <Link key={index} to={`/${img.id}`}>
                  <Box
                    border="1px solid #d0d0d0"
                    paddingTop={"5px"}
                    borderRadius={"2px"}
                    marginBottom={"10px"}
                    alignItems={"center"}
                    display={"flex"}
                    flexDirection="column"
                    key={index}
                    _hover={{
                      backgroundColor: "rgba(0,0,0,0.085)",
                      cursor: "pointer"
                    }}
                  >
                    <Image
                      position="relative"
                      padding={"5px"}
                      border="1px solid #d0d0d0"
                      src={img.preview}
                      boxSize="150px"
                      width={"250px"}
                      alt="Dan Abramov"
                      onClick={() => handleImport(img.id)}
                    />
                    <Box
                      paddingLeft="20px"
                      paddingRight={"20px"}
                      fontSize={"13px"}
                      fontFamily="Roboto"
                      display="flex"
                      flexDirection={"row"}
                      w="100%"
                    >
                      <Text color="black" fontWeight="bold">
                        {img.name}
                      </Text>
                      <Spacer />
                    </Box>
                  </Box>
                </Link>
              )
            })} */}
          </Box>
          <Box
            sx={{
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {imgData.images.length <= pager.page * 10 ? <label>...</label> : <LoadMore />}
          </Box>
        </Scrollbar>
      </Flex>
    </Box>
  )
}
export default Layers
