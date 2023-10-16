import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { NoteContextProvider } from "./contexts/NoteContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import App from "./App";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <NoteContextProvider>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </NoteContextProvider>
  </AuthContextProvider>
);
