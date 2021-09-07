import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
export default function NavBar({ totalItems }) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/portfolio-231ae.appspot.com/o/images%2Fno-image.jpg?alt=media&token=c0c48b13-bbc5-4d7d-a563-26818e564ee8"
              }
              alt={"nothing to show place holder"}
              height="25px"
              className={classes.image}
            />
            <Link to="/" className={classes.link}>
              store name
            </Link>
          </Typography>

          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <Link to="/cart">
                <IconButton>
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
