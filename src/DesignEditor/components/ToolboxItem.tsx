import React from "react"
import { Box } from "@chakra-ui/react"
import { useActiveObject } from "@scenify/react"
import ToolboxItems from "./toolbox-items"
interface State {
  activeToolbox: string | null
}
export default function ToolboxItem() {
  const [state, setState] = React.useState<State>({
    activeToolbox: null
  })
  const activeObject = useActiveObject() as any

  React.useEffect(() => {
    if (activeObject) {
      setState({ activeToolbox: activeObject.type })
    } else {
      setState({ activeToolbox: null })
    }
  }, [activeObject])

  if (!state.activeToolbox) {
    return null
  }
  // @ts-ignore
  const Component = ToolboxItems[state.activeToolbox]
  return <Box>{Component && <Component />}</Box>
}
