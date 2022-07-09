import { Box } from "@chakra-ui/react"
import type { NextPage } from "next"
import Editor from "~/DesignEditor/Editor"

const Home: NextPage = () => {
  return (
    <Box>
      <Editor />
    </Box>
  )
}

export default Home
