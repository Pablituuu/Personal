import React from "react"

interface ILayoutContext {
  activePanel: string
  setActivePanel: React.Dispatch<React.SetStateAction<string>>
}

export const LayoutContext = React.createContext<Partial<ILayoutContext>>({})

export const LayoutContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePanel, setActivePanel] = React.useState<string>("Images")
  return (
    <LayoutContext.Provider
      value={{
        activePanel,
        setActivePanel
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
