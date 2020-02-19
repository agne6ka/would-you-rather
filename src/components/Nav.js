import React, { useState } from "react";
import { useLocation, Switch, Route, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 0.1
  },
  tabs: {
    flexGrow: 1
  },
  text: {
    display: "inline-block"
  }
}));

function Nav() {
  let location = useLocation().pathname;
  const classes = useStyles();
  const paths = ["/", "/new", "/leaderboard"];
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(
    paths.indexOf(location) > 0 ? paths.indexOf(location) : 0
  );
  const open = Boolean(anchorEl);

  //ToDo: fix 404 `Tabs component is invalid` error

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            WOULD YOU RATHER?
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            className={classes.tabs}
          >
            <Tab label="Homepage" component={NavLink} to={paths[0]} />
            <Tab label="New question" component={NavLink} to={paths[1]} />
            <Tab label="Leader board" component={NavLink} to={paths[2]} />
          </Tabs>
          <Switch>
            <Route path={paths[0]} />
            <Route path={paths[1]} />
            <Route path={paths[2]} />
          </Switch>
          <div>
            <Typography variant="subtitle1" className={classes.text}>
              Hello User
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
