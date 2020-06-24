import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import { customerService } from "../../_services/customer.service";

import {
  Dialog,
  DialogContentText,
  DialogContent,
  Divider,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  dialog: {
    margin: theme.spacing(3),
  },
}));
export function AddCustomer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    name: "",
    email: "",
    address: "",
    mobileNo: "",
  });
  const handleChange = (prop) => (event) => {
    setState({
      ...state,
      [prop]: event.target.value,
    });
  };
  const handleSubmit = () => {
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="add-supplier-dialog-title"
        className={classes.dialog}
        maxWidth={props.maxWidth}
        fullWidth={true}
      >
        <DialogTitle id="add-supplier-dialog-title">
          <Typography style={{ fontSize: "30px" }} align="center">
            Add New Customer
          </Typography>
        </DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <Grid container>
            <Grid item xs={12}>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange("name")}
                    // size="small"
                    // helperText="Supplier's name"
                  />
                </ListItemText>
              </ListItem>
            </Grid>
            <Grid item xs={12}>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange("email")}
                    // size="small"
                    // helperText="Supplier's email"
                  />
                </ListItemText>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemIcon>
                  <BusinessIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <TextField
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange("address")}
                    // size="small"
                    // helperText="Supplier's address"
                  />
                </ListItemText>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemIcon>
                  <PhoneAndroidIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <TextField
                    required
                    id="mobileNo"
                    name="mobileNo"
                    label="Mobile Number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange("mobileNo")}
                    // size="small"
                    // helperText="Supplier's Mobile Number"
                  />
                </ListItemText>
              </ListItem>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={props.onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddCustomer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  maxWidth: PropTypes.string,
};
