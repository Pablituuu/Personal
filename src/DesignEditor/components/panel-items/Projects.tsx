import { Box, Button, Input, Center, Image, Text, Spacer } from "@chakra-ui/react"
import { useEditor } from "@scenify/react"
import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import Icons from "~/components/Icons"
// import { TemplatesDTO } from "~/interfaces/editor"
import LoadMore from "~/components/Icons/LoadMore"
// import { useSelector } from "react-redux"
// import { selectUser } from "~/store/user/selector"
// import { useAppDispatch } from "~/store/store"
// import { getDeleteTemplate, getJustTemplate, getListTemplates } from "~/store/templates/actions"

// import { Link } from "react-router-dom"
import Scrollbars from "@scenify/react-custom-scrollbar"
// import { uniqBy } from "lodash"
// import { selectTemplate } from "~/store/templates/selector"

function Projects() {
  const imgReducer = (state: any, action: any) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, images: state.images.concat(action.images) }
      case "RETURN":
        return { ...state, images: [] }
      default:
        return state
    }
  }

  const pageReducer = (state: any, action: any) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 1 }
      case "RETURN":
        return { ...state, page: 1 }
      default:
        return state
    }
  }

  // const user = useSelector(selectUser)
  let bottomBoundaryRef = useRef(null)
  const editor = useEditor()
  let [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 })
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true })
  // const dispatch = useAppDispatch()
  const [a, b] = useState<boolean | null>(null)

  useEffect(() => {
    pager.page = 1
  }, [])

  useEffect(() => {
    // if (user != null) {
    //   const query: TemplatesDTO = {
    //     page: pager.page,
    //     limit: 10,
    //     query: {
    //       imported: a
    //     }
    //   }
    //   dispatch(getListTemplates(query))
    // }
  }, [pager.page, a])

  // let listTemplates = useSelector(selectTemplate)

  // useEffect(() => {
  //   if (listTemplates.template) {
  //     imgDispatch({ type: "STACK_IMAGES", images: listTemplates.template.templates })
  //   }
  // }, [listTemplates, a])

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
    [pagerDispatch, a]
  )

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current)
    }
  }, [scrollObserver, bottomBoundaryRef, a])

  const handleDuplicate = (id: any) => {}

  const handleDelete = (id: any) => {
    // dispatch(getDeleteTemplate(id))
  }

  const handleImport = (id: any) => {
    // dispatch(getJustTemplate(id))
  }

  // const templateValidate = uniqBy(imgData.images, "id")

  const listNewTemplates = (type: boolean | null) => {
    imgDispatch({ type: "RETURN" })
    pagerDispatch({ type: "RETURN" })
    b(type)
  }

  return (
    <Box
      color="#707070"
      fontSize={"1rem"}
      fontFamily={"Roboto"}
      padding={"20px"}
      flexDirection="column"
      sx={{ width: "320px" }}
      h="99%"
    >
      {/* {user == null ? (
        <Center h="100%">Only logged in users can see this content</Center>
      ) : ( */}
      <>
        <Box borderRadius={"4px"} border={"1px solid rgb(232, 232, 232)"} display="flex">
          <Input variant={"unstyled"} type="text" placeholder="Search your project" />
          <Button variant={"unstyled"} leftIcon={<Icons.Search size={19} />}></Button>
        </Box>
        <Box
          marginTop="10px"
          marginBottom="10px"
          display={"flex"}
          flexDirection="row"
          borderBottom={"2px solid rgb(232, 232, 232)"}
        >
          <Box
            position={"relative"}
            marginRight={"10px"}
            display="flex"
            onClick={() => listNewTemplates(null)}
            _hover={{ cursor: "pointer", color: "#ff5d13", borderBottom: "5px solid" }}
          >
            <Icons.SymbolP size={20} />
            <Text paddingLeft={"10px"}>Projects</Text>
          </Box>
          <Box
            onClick={() => listNewTemplates(true)}
            display="flex"
            _hover={{ cursor: "pointer", color: "#ff5d13", borderBottom: "5px solid" }}
          >
            <Icons.Download size={20} />
            <Text paddingLeft={"10px"}>Imports</Text>
          </Box>
        </Box>
        <Box h="88%" flexWrap="wrap">
          <Scrollbars>
            <Box>
              {/* {templateValidate.map((img: any, index: any) => {
                  let date = new Date(img.created_at * 1000)
                  let formatDate = date.toLocaleDateString("en-US")
                  return (
                    <Link key={index} to={`/${img.id}`}> */}
              <Box
                border="1px solid #d0d0d0"
                paddingTop={"5px"}
                borderRadius={"2px"}
                marginBottom={"10px"}
                alignItems={"center"}
                display={"flex"}
                flexDirection="column"
                // key={index}
                _hover={{
                  backgroundColor: "rgba(0,0,0,0.085)",
                  cursor: "pointer"
                }}
              >
                <Image
                  position="relative"
                  padding={"5px"}
                  border="1px solid #d0d0d0"
                  // src={img.preview}
                  boxSize="150px"
                  width={"250px"}
                  alt="Dan Abramov"
                  // onClick={() => handleImport(img.id)}
                />
                <Box
                  //onClick={() => handleDuplicate(img.id)}
                  position={"absolute"}
                  marginLeft="150px"
                  marginTop="8px"
                  _hover={{ color: "#ff5d13" }}
                  borderRadius={"20px"}
                  border={"1px solid rgb(232, 232, 232)"}
                  backgroundColor={"white"}
                >
                  <Icons.Duplicate size={20} />
                </Box>
                <Box
                  //onClick={() => handleDelete(img.id)}
                  position={"absolute"}
                  marginLeft="200px"
                  marginTop="8px"
                  _hover={{ color: "#ff5d13" }}
                  borderRadius={"20px"}
                  border={"1px solid rgb(232, 232, 232)"}
                  backgroundColor={"white"}
                >
                  <Icons.Trash size={20} />
                </Box>
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
                    {/* {img.name} */}
                  </Text>
                  <Spacer />
                  {/* <Text>{formatDate}</Text> */}
                </Box>
              </Box>
              {/* </Link> */}){/* })} */}
            </Box>
            <div
              id="page-bottom-boundary"
              style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              ref={bottomBoundaryRef}
            ></div>
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
          </Scrollbars>
        </Box>
      </>
      {/* )} */}
    </Box>
  )
}

export default Projects
