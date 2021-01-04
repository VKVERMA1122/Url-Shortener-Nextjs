import { ChakraProvider } from "@chakra-ui/react";
// import "../style/gobal.css"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
