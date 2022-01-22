import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem
} from "@material-ui/core";
import { Link } from "react-router-dom";
import NavbarDrawer from './NavbarDrawer'
import './FontStyle.css'
import Context from "./ContextApi/CreateContext";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    color: "gold",
    fontFamily: 'Mochiy Pop One, sans-serif',
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
    fontFamily: 'Mochiy Pop One, sans-serif'
  },
  appbar: {
    backgroundColor: "#313B3B",
  },
  dropdown: {
    fontFamily: 'Mochiy Pop One, sans-serif',
    backgroundColor: "#6B7373",
    color: "white",
    padding: "10px",
  },
  dropbox: {
    backgroundColor: "#6B7373",
    color: "white",
    padding: "0px",
  },
  curr: {
    color: "white",
    backgroundColor: "#7A8787",
    padding: "3px",
  },
  leftgap: {
    marginLeft: "50px"
  }
}));

const Header = () => {

  const capi = useContext(Context);

  console.log(capi.currency);
  console.log(capi.symbol);

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event) => {
    capi.setcurrency(event.target.value);
    capi.ChangeCurrency();
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.appbar}>
        <Typography variant="h4" className={classes.logo}>
          Crypto Hunter
        </Typography>
        {/* .............. */}

        {/* .............. */}
        {isMobile ? (
          <div>
            <Select
              value={capi.currency}
              id="switchCurrency"
              onChange={handleChange}
              className={classes.curr}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
            <NavbarDrawer />
          </div>
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            <Link to="/portfolio" className={classes.link}>
              Portfolio
            </Link>
            <Link to="/market" className={classes.link}>
              Market
            </Link>
            <Select
              value={capi.currency}
              id="switchCurrency"
              onChange={handleChange}
              className={`${classes.curr} ${classes.leftgap}`}
            >
              <MenuItem value={"INR"} >INR</MenuItem>
              <MenuItem value={"USD"} >USD</MenuItem>
            </Select>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;