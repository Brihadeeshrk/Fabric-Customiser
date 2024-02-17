import { theme } from "@/chakra/theme";
import FabricContextProvider from "@/store/context";
import "@/styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Client, HydrationProvider } from "react-hydration-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HydrationProvider>
      <Client>
        <FabricContextProvider>
          <div>
            <Toaster />
          </div>
          <ChakraProvider theme={theme}>
            <Box color={"#14281D"}>
              <Component {...pageProps} />
            </Box>
          </ChakraProvider>
        </FabricContextProvider>
      </Client>
    </HydrationProvider>
  );
}
