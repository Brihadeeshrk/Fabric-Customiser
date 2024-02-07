import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import FabricContextProvider from "@/store/context";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FabricContextProvider>
      <div>
        <Toaster />
      </div>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </FabricContextProvider>
  );
}
