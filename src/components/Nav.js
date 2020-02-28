import React, { useState, useEffect, Fragment } from "react";
import { useLocation, Switch, Route, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
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

function Nav(props) {
  const classes = useStyles();
  let location = useLocation().pathname;
  const paths = ["/", "/add", "/leaderboard"];
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);
  const open = Boolean(anchorEl);
  const { userData, logout } = props;
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleChange = (e, newValue) => setValue(newValue);
  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };
  useEffect(() => {
    setValue(paths.indexOf(location) > 0 ? paths.indexOf(location) : 0);
  }, [paths, location]);

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
            {userData && (
              <Fragment>
                <Typography variant="subtitle1" className={classes.text}>
                  Hello, {userData.name}
                </Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar alt={userData.name} src={userData.avatarURL} />
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
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Fragment>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
