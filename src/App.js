import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
import RoutesMain from "./RoutesMain";
import { UserProvider } from "./context/UserContext";
import { OffLineProvider } from "./context/OffLineContext";

const App = () => {

  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <OffLineProvider>
              <RoutesMain />
            </OffLineProvider>
          </UserProvider>
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter>
  )
};

export default App;
