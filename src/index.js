import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
// import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        {/* <ChakraProvider> */}
          <App />
        {/* </ChakraProvider> */}
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
