import { Box } from "@chakra-ui/react"
import Canvas from "./components/Canvas"
import Header from "./components/Header"
import PanelItem from "./components/PanelItem"
import PanelList from "./components/PanelList"

export default function Editor() {
  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <PanelList />
        <Box sx={{ flex: 1, display: "flex" }}>
          <Canvas />
          <PanelItem />
        </Box>
      </Box>
    </Box>
  )
}
