import React from "react";
import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLocation } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "50ch",
    fontSize: "14px",
  },
}));

export default function SearchAppBar() {
  const location = useLocation();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{
          flexGrow: 1,
          display: { xs: "none", sm: "block" },
          fontWeight: 700,
        }}
      >
        {location.pathname.split("/").pop().capitalize()}
      </Typography>
      <Search sx={{ mx: 2, backgroundColor: "#F4F4F5" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          sx={{ minWidth: "300px" }}
          placeholder="Search  by Truck Number or Worker Name"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <NotificationsOutlinedIcon sx={{ mx: 2 }} />
      <AccountCircleOutlinedIcon sx={{ mx: 2 }} />
    </div>
  );
}
