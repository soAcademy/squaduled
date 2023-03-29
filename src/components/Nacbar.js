import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 250,
  },
}));

const darkGreenTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#4A7654',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={darkGreenTheme}>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} color="white">
            Squaduled
            </Typography>
            <div style={{ marginLeft: 'auto' }}>
              <IconButton color="secondary">
                <i className="fa fa-hammer" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
          <div className={classes.drawer}>
            <List>
              <ListItem button key="ดูการจอง">
                <ListItemText primary="ดูการจอง" />
              </ListItem>
              <ListItem button key="Admin">
                <ListItemText primary="Admin" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

export default Navbar;
