import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import SettingsIcon from "@material-ui/icons/Settings";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import StoreIcon from "@material-ui/icons/Store";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import FaceIcon from "@material-ui/icons/Face";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    paddingLeft: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "16px",
    },
  },
}));

export const MainListItems = () => {
  const classes = useStyles();
  return (
    <div>
      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Cashier UI" />
      </ListItem>
      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>

      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Bill" />
      </ListItem>
    </div>
  );
};
export const ThirdListItems = () => {
  const classes = useStyles();
  return (
    <div>
      {/* <ListSubheader inset>Manage Store</ListSubheader> */}
      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <ContactSupportIcon />
        </ListItemIcon>
        <ListItemText primary="Contact Support" />
      </ListItem>
    </div>
  );
};
export const SecondaryListItems = () => {
  const classes = useStyles();
  return (
    <div>
      {/* <ListSubheader inset>Manage Store</ListSubheader> */}
      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItem>
      <ListItem button className={classes.sidebar}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
      </ListItem>
    </div>
  );
};
