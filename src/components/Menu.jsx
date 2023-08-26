import { useTheme } from "@emotion/react";
import {
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

const menus = [
  { label: "Home", icon: "home" },
  { label: "Insights", icon: "insights" },
  { label: "break" },
  { label: "Settings", icon: "settings" },
  { label: "Logout", icon: "logout", to: "/logout" },
];

const Menu = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 0.15,
        borderRight: "1px solid #E0E0E0",
      }}
    >
      <Toolbar sx={{ mx: 1, display: "flex", justifyContent: "center" }}>
        <img src={Logo} alt="logo" />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          color="secondary"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Yardify
        </Typography>
      </Toolbar>
      <List sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {menus.map(({ label, icon, to }) =>
          label === "break" ? (
            <div style={{ flexGrow: 1 }} />
          ) : (
            <ListItem
              disablePadding
              sx={{
                my: 2,
                mx: 3,
                width: "auto",
              }}
            >
              <NavLink
                to={to || icon}
                key={label}
                end
                style={({ isActive }) => {
                  return {
                    borderRadius: "10px",
                    width: "100%",
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    backgroundColor: isActive
                      ? theme.palette.secondary.main
                      : undefined,
                  };
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "inherit",
                      backgroundColor: "inherit",
                      minWidth: "auto",
                      mr: 2,
                    }}
                  >
                    <Icon>{icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    secondary={label}
                    secondaryTypographyProps={{
                      sx: {
                        color: "inherit",
                        backgroundColor: "inherit",
                      },
                    }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          )
        )}
      </List>
    </div>
  );
};

export default Menu;
