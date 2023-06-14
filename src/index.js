import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider,extendTheme } from '@chakra-ui/react';
import { AuthContextProvider } from './AuthContextProvider/AuthContextProvider';
import reportWebVitals from './reportWebVitals';

const theme = extendTheme({
  colors: {
    primary: {
      100: "#A57BA3",
      200: "#739BA9",
      300: "#737F96",
      400: "#AEBDD4"
    },
    secondary: {
      100: "#BEC8D7",
      200: "#E0E9F6",
      300: "#D9DEE8"
    },
    third: {
      100: "#1C2935",
      200: "#92A2B2"
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
