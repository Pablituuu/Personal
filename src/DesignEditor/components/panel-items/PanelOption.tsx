import { Box, Flex, Button, Input, Image, Text } from "@chakra-ui/react"
import { useEditor } from "@scenify/react"
import Icons from "~/components/Icons"

import { useEffect, useRef, useCallback, useReducer, useState } from "react"
import LoadMore from "~/components/Icons/LoadMore"
import { selectResourceList } from "~/store/resources/selector"
// import { selectUser } from "~/store/user/selector"
import { SearchResourceDto } from "~/interfaces/editor"
import Scrollbars from "@scenify/react-custom-scrollbar"
import { uniqBy } from "lodash"
import { useAppDispatch, useAppSelector } from "~/hooks/useRedux"
import {
  getFavoriteResource,
  getListFavoriteResources,
  getListRecentResource,
  getListResources,
  setRecentResource,
  setResources
} from "~/store/resources/action"

function PanelOption({ option }: { option: string }) {
  let bottomBoundaryRef = useRef(null)
  const dispatch = useAppDispatch()
  const editor = useEditor()
  // const user = useAppSelector(selectUser)
  let [a, b] = useState<number | null>(null)

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

  let [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 })
  let [resourceData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true })

  useEffect(() => {
    const query: SearchResourceDto = {
      limit: 10,
      page: pager.page,
      query: {
        categories: [option],
        type: "",
        published: true
      }
    }

    if (a == null || a == 1) {
      dispatch(getListResources(query))
    } else if (a == 2 && pager.page == 1) {
      dispatch(getListFavoriteResources())
    } else if (a == 3 && pager.page == 1) {
      dispatch(getListRecentResource())
    }
  }, [pager.page, a])

  let resource: any

  if (a == null || a == 1) {
    resource = useAppSelector(selectResourceList)
  }
  // else if (a == 2) {
  //   resource = useAppSelector(selectListFavoriteResources)
  // } else {
  //   resource = useAppSelector(selectRecentResource)
  // }

  // const listFavorite: any = useAppSelector(selectListFavoriteResources)

  useEffect(() => {
    if (resource) {
      imgDispatch({ type: "STACK_IMAGES", images: resource })
    }
  }, [resource, a])

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
    dispatch(setResources(null))
  }, [resourceData.images, a])

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current)
    }
  }, [scrollObserver, bottomBoundaryRef, a])

  const addImage = (images: any) => {
    // if (user) {
    //   dispatch(setRecentResource(images.id))
    // }
    const options = {
      type: "StaticVector",
      name: "Shape",
      src: images.preview,
      metadata: {}
    }
    if (editor) {
      editor.objects.add(options)
    }
  }

  let [isVisible, setIsVisible] = useState<any[]>([])

  function over(e: boolean, item: number) {
    let count = 0
    let newArray: any[] = []
    resourceData.images.map((img: any, index: number) => {
      if (count === item) {
        newArray[count] = true
      } else {
        newArray[count] = false
      }
      count = count + 1
    })
    setIsVisible(newArray)
  }

  function down(e: boolean, item: number) {
    let count = 0
    let newArray: any[] = []
    resourceData.images.map((img: any, index: number) => {
      newArray[count] = false
      count = count + 1
    })
    setIsVisible(newArray)
  }

  const listNewResource = (option: number) => {
    imgDispatch({ type: "RETURN" })
    pagerDispatch({ type: "RETURN" })
    b(option)
  }

  const resourceValidate = uniqBy(resourceData.images, "id")

  return (
    <Box fontSize="14px" fontFamily="Roboto" fontWeight="400" w="320px" padding="20px">
      <Box
        borderRadius={"4px"}
        border={"1px solid rgb(232, 232, 232)"}
        h="45px"
        position={"relative"}
        w="100%"
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
          onClick={() => listNewResource(1)}
          _hover={{ cursor: "pointer", color: "#ff5d13", borderBottom: "3px solid" }}
        >
          <Icons.Search size={12} />
          <Text paddingLeft={"10px"}>All</Text>
        </Box>
        <Box
          alignItems={"center"}
          display="flex"
          flexDirection={"row"}
          onClick={() => listNewResource(2)}
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
          onClick={() => listNewResource(3)}
          _hover={{ cursor: "pointer", color: "#ff5d13", borderBottom: "3px solid" }}
        >
          <Icons.Clock size={12} />
          <Text paddingLeft={"10px"}>Recent</Text>
        </Box>
      </Flex>
      <Box display="flex" flexWrap="wrap" h="88%">
        <Scrollbars>
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              padding: "0.5rem 0",
              gridTemplateColumns: "1fr 1fr"
            }}
          >
            {resourceValidate.map((resource: any, index: number) => {
              let content
              let colorFavorite = false
              // if (listFavorite != null && resource != null) {
              //   listFavorite.map((favorites: any) => {
              //     if (favorites.id == resource.id) {
              //       colorFavorite = true
              //     }
              //   })
              // }
              resource
                ? (content = (
                    <Box
                      display="flex"
                      flexDirection="row"
                      border="1px solid rgb(232, 232, 232)"
                      _hover={{ cursor: "pointer" }}
                      boxSize={"120px"}
                      key={index}
                      onMouseOver={() => over(false, index)}
                      onMouseOut={() => down(true, index)}
                    >
                      {/* {user ? (
                        <Button
                          position="absolute"
                          onClick={() => {
                            dispatch(getFavoriteResource(resource.id))
                            colorFavorite = !colorFavorite
                          }}
                          size="xs"
                          borderRadius={"20px"}
                          border={"1px solid rgb(232, 232, 232)"}
                          backgroundColor={"white"}
                          alignContent={"center"}
                          color={colorFavorite == false ? "#707070" : "yellow"}
                          _hover={{ color: "#ff5d13" }}
                        >
                          <Icons.Love size={12} />
                        </Button>
                      ) : null} */}
                      <Flex alignItems="center" onClick={() => addImage(resource)} justifyContent="center" w="100%">
                        <Image height={"100%"} src={resource.preview}></Image>
                      </Flex>
                      <Box
                        bgGradient="linear-gradient(180deg, rgba(200,200,204,0.15868354177608546) 0%, rgba(96,96,105,0.4471989479385504) 50%, rgba(100,104,105,0.6740897042410714) 100%)"
                        position="absolute"
                        marginTop="98px"
                        w="118px"
                        display={isVisible[index] == undefined || isVisible[index] == false ? "none" : "block"}
                      >
                        <Text color="black">{resource.name}</Text>
                      </Box>
                    </Box>
                  ))
                : (content = null)
              return content
            })}
            <div style={{ border: "1px solid rgba(0,0,0,0.05)" }} ref={bottomBoundaryRef}></div>
          </div>
          <Box display="flex" justifyContent="center" w="100%">
            {resourceData.images.length <= pager.page * 10 ? <label>...</label> : <LoadMore />}
          </Box>
        </Scrollbars>
      </Box>
    </Box>
  )
}

export default PanelOption
