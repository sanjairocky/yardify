import { Outlet } from "react-router-dom";
import AppBar from "../../components/AppBar";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import Menu from "../../components/Menu";

const Desktop = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      secondary: {
        main: "#377DFF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          height: "100%",
        }}
      >
        <Menu />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 0.9,
            padding: "10px 30px 0 30px",
          }}
        >
          <AppBar />
          <Outlet />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Desktop;
