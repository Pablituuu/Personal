import useActivePanel from "~/hooks/useActivePanel"
import * as PanelItems from "./panel-items"

function PanelItem() {
  const activePanel = useActivePanel()
  // @ts-ignore
  const Panel = PanelItems[activePanel]
  return <Panel />
}

export default PanelItem
