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
import InboxIcon from "@material-ui/icons/Inbox";
import PaymentIcon from "@material-ui/icons/Payment";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter, useLocation } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
const useStyles = makeStyles((theme) => ({
  sidebar: {
    paddingLeft: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "16px",
    },
  },
  inheritLink: {
    textDecoration: "inherit",
    color: "inherit",
  },
  onSite: {
    paddingLeft: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "16px",
    },
    backgroundColor: "#f7f7f7",
  },
}));

const MainItems = [
  {
    primary: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    primary: "Cashier UI",
    path: "/cashierui",
    icon: MonetizationOnIcon,
  },
  {
    primary: "Customers",
    path: "/customers",
    icon: FaceIcon,
  },
  {
    primary: "Bill",
    path: "/bill",
    icon: ReceiptIcon,
  },
  {
    primary: "Import Product",
    path: "importProduct",
    icon: AddBoxIcon,
  },
];
const SecondaryItems = [
  {
    primary: "Employee",
    path: "/employee",
    icon: PeopleIcon,
  },
  {
    primary: "Inventory",
    path: "/inventory",
    icon: InboxIcon,
  },
  {
    primary: "Supplier",
    path: "/Supplier",
    icon: StoreIcon,
  },
  {
    primary: "Invoice",
    path: "/invoice",
    icon: PaymentIcon,
  },
  {
    primary: "Report",
    path: "/report",
    icon: BarChartIcon,
  },
];
const ThirdItems = [
  {
    primary: "Contact Support",
    path: "/contact",
    icon: ContactSupportIcon,
  },
];
export const MainListItems = (props) => {
  const classes = useStyles();
  let location = useLocation();
  return (
    <div>
      {MainItems.map((item, index) => (
        <ListItem
          button
          className={
            location.pathname == item.path ? classes.onSite : classes.sidebar
          }
          component={Link}
          to={item.path}
          key={index}
        >
          <ListItemIcon>
            <item.icon
              color={location.pathname == item.path ? "primary" : ""}
            />
          </ListItemIcon>
          <ListItemText
            primary={item.primary}
            style={location.pathname == item.path ? { color: "#3f51b5" } : {}}
          />
        </ListItem>
      ))}
    </div>
  );
};
export const ThirdListItems = () => {
  const classes = useStyles();
  let location = useLocation();
  return (
    <div>
      {ThirdItems.map((item, index) => (
        <ListItem
          button
          className={
            location.pathname == item.path ? classes.onSite : classes.sidebar
          }
          component={Link}
          to={item.path}
          key={index}
        >
          <ListItemIcon>
            <item.icon
              color={location.pathname == item.path ? "primary" : ""}
            />
          </ListItemIcon>
          <ListItemText
            primary={item.primary}
            style={location.pathname == item.path ? { color: "#3f51b5" } : {}}
          />
        </ListItem>
      ))}
    </div>
  );
};
export const SecondaryListItems = () => {
  let location = useLocation();
  const classes = useStyles();
  return (
    <div>
      {SecondaryItems.map((item, index) => (
        <ListItem
          button
          className={
            location.pathname == item.path ? classes.onSite : classes.sidebar
          }
          component={Link}
          to={item.path}
          key={index}
        >
          <ListItemIcon>
            <item.icon
              color={location.pathname == item.path ? "primary" : ""}
            />
          </ListItemIcon>
          <ListItemText
            primary={item.primary}
            style={location.pathname == item.path ? { color: "#3f51b5" } : {}}
          />
        </ListItem>
      ))}
    </div>
  );
};
