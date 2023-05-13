import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../context/auth";
import { GoGraph } from "react-icons/go";
import {
  RiAdminLine,
  RiArchiveDrawerLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import logo from "./LOGO5.png";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const NavBar = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ElevationScroll {...props}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="bg-gradient-to-r from-[#4A7654] to-[#8ac598] text-white">
          <Toolbar>
            <Button
              color="inherit"
              onClick={() => {
                navigate(auth.isLoggedIn ? "/" : "/login");
              }}
            >
              <img src={logo} className="w-[40px]" />
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Squaduled
            </Typography>

            {auth.isLoggedIn && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/room-booking-list");
                      setAnchorEl(null);
                    }}
                  >
                    <RiArchiveDrawerLine />
                    &nbsp;&nbsp; ดูรายการจอง
                  </MenuItem>

                  {auth.role === "admin" && (
                    <MenuItem
                      onClick={() => {
                        navigate("/management-list");
                        setAnchorEl(null);
                      }}
                    >
                      <RiAdminLine />
                      &nbsp;&nbsp; Admin
                    </MenuItem>
                  )}

                  {auth.role === "admin" && (
                    <MenuItem
                      onClick={() => {
                        navigate("/dashboard");
                        setAnchorEl(null);
                      }}
                    >
                      <GoGraph />
                      &nbsp;&nbsp; Dash board
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={() => {
                      props.handleLogout();
                      setAnchorEl(null);
                    }}
                  >
                    <RiLogoutBoxRLine />
                    &nbsp;&nbsp; Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ElevationScroll>
  );
};

export default NavBar;
