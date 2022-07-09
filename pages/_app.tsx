import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider as ScenifyProvider } from "@scenify/react"
import { LayoutContextProvider } from "~/contexts/LayoutContext"
import { Provider, useStore } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import store from "~/store/store"
import { persistStore } from "redux-persist"

const persistor = persistStore(store)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <LayoutContextProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ScenifyProvider>
              <Component {...pageProps} />
            </ScenifyProvider>
          </PersistGate>
        </Provider>
      </LayoutContextProvider>
    </ChakraProvider>
  )
}
