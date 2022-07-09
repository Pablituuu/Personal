import { Box } from "@chakra-ui/react"
import { Canvas as ScenifyCanvas } from "@scenify/react"
import Footer from "./Footer"

function Canvas() {
  return (
    <Box sx={{ backgroundColor: "#ecf0f1", flex: 1, display: "flex", position: "relative" }}>
      <ScenifyCanvas
        config={{
          background: "#F9F9F9"
        }}
      />
      <Footer />
    </Box>
  )
}

export default Canvas
