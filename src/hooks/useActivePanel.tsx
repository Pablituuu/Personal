import React from "react"
import { LayoutContext } from "../contexts/LayoutContext"

function useActivePanel() {
  const { activePanel } = React.useContext(LayoutContext)
  return activePanel as string
}

export default useActivePanel
