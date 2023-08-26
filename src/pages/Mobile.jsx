import { AppBar, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

const Mobile = () => {
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Outlet />
    </ThemeProvider>
  );
};

export default Mobile;
