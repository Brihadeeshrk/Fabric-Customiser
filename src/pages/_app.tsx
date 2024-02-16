import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import FabricContextProvider from "@/store/context";
import { HydrationProvider, Client } from "react-hydration-provider";
import { theme } from "@/chakra/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HydrationProvider>
      <Client>
        <FabricContextProvider>
          <div>
            <Toaster />
          </div>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </FabricContextProvider>
      </Client>
    </HydrationProvider>
  );
}
