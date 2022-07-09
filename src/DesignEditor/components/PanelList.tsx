import React, { useEffect, useState } from "react"
import { Box, Flex, Text, Spacer } from "@chakra-ui/react"
import { panels, undoredo, config } from "~/constants/app"
import Icons from "~/components/Icons"
import { useEditor } from "@scenify/react"
import { LayoutContext } from "~/contexts/LayoutContext"
import ToolboxItem from "./ToolboxItem"

function PanelList() {
  const editor = useEditor()
  const [historyStatus, setHistoryStatus] = useState({ hasUndo: false, hasRedo: false })
  const { setActivePanel, activePanel } = React.useContext(LayoutContext)
  useEffect(() => {
    const handleHistoryChange = (data: any) => {
      setHistoryStatus({ ...historyStatus, hasUndo: data.hasUndo, hasRedo: data.hasRedo })
    }
    if (editor) {
      editor.on("history:changed", handleHistoryChange)
    }
    return () => {
      if (editor) {
        editor.off("history:changed", handleHistoryChange)
      }
    }
  }, [editor])

  return (
    <Flex h="3.1rem" borderBottom={"1px solid rgb(232, 232, 232)"}>
      <Box borderRight="1px solid rgb(232, 232, 232)" alignItems={"center"} display={"flex"} padding={"0.5rem"}>
        {undoredo.map((undoredo) => {
          return (
            <Box
              key={undoredo.name}
              sx={{
                padding: "0.5rem",
                display: "flex"
              }}
              h="49px"
              flexDirection={"column"}
              borderRadius={"8px"}
              _hover={{
                backgroundColor: "rgba(0,0,0,0.085)",
                cursor: "pointer"
              }}
              fontFamily="Nanito Sans"
              onClick={undoredo.name == "Undo" ? () => editor.history.undo() : () => editor.history.redo()}
            >
              {undoredo.name == "Redo" ? <Icons.Redo size={20} /> : <Icons.Undo size={20} />}
              <Text fontSize={"11px"}>{undoredo.name}</Text>
            </Box>
          )
        })}
      </Box>
      <Box borderRight="1px solid rgb(232, 232, 232)" alignItems={"center"} display={"flex"} padding={"0.5rem"}>
        {panels.map((panel) => {
          return (
            <Box
              h="48px"
              onClick={() => {
                if (setActivePanel) {
                  setActivePanel(panel.name)
                }
              }}
              key={panel.name}
              sx={{
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                fontFamily: "Nunito Sans",
                borderRadius: "8px",
                backgroundColor: activePanel === panel.name ? "rgba(0,0,0,0.085)" : "#ffffff",
                ":hover": {
                  backgroundColor: "rgba(0,0,0,0.085)",
                  cursor: "pointer"
                }
              }}
            >
              {panel.name == "Images" ? <Icons.Images size={20} /> : null}
              {panel.name == "Shapes" ? <Icons.Shapes size={20} /> : null}
              {panel.name == "Frames" ? <Icons.Frames size={20} /> : null}
              {panel.name == "Backgrounds" ? <Icons.Backgrounds size={20} /> : null}
              {panel.name == "Texts" ? <Icons.Text size={20} /> : null}
              {panel.name == "Uploads" ? <Icons.Uploads size={20} /> : null}
              <Text fontSize={"11px"}>{panel.name}</Text>
            </Box>
          )
        })}
      </Box>
      <ToolboxItem />
      <Spacer />
      <Box borderLeft="1px solid rgb(232, 232, 232)" display={"flex"}>
        {config.map((config) => {
          return (
            <Box
              onClick={() => {
                if (setActivePanel) {
                  setActivePanel(config.name)
                }
              }}
              h="49px"
              key={config.name}
              sx={{
                padding: "0.5rem",
                display: "flex"
              }}
              flexDirection={"column"}
              borderRadius={"8px"}
              _hover={{
                backgroundColor: "rgba(0,0,0,0.085)",
                cursor: "pointer"
              }}
            >
              {config.name == "Projects" ? <Icons.Projects size={20} /> : null}
              {config.name == "Templates" ? <Icons.Templates size={20} /> : null}
              {config.name == "Layers" ? <Icons.Layers size={20} /> : null}
              {config.name == "Settings" ? <Icons.Settings size={20} /> : null}
              <Text fontSize={"11px"}>{config.name}</Text>
            </Box>
          )
        })}
      </Box>
    </Flex>
  )
}

export default PanelList
