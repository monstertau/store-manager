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
import Paper from "@material-ui/core/Paper";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import FaceIcon from "@material-ui/icons/Face";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
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
  formControl: {
    margin: theme.spacing(1),
    display: "flex",
  },
}));
export function AddEmployee(props) {
  const classes = useStyles();

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
            Add New Employee
          </Typography>
        </DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <Grid container>
            <Grid item xs={12}>
              <ListItem>
                <ListItemIcon>
                  <FaceIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    // size="small"
                    // helperText="Supplier's name"
                  />
                </ListItemText>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <TextField
                    required
                    id="username"
                    name="username"
                    label="Username"
                    fullWidth
                    variant="outlined"
                    // size="small"
                    // helperText="Supplier's email"
                  />
                </ListItemText>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                    type="number"
                    variant="outlined"
                    // size="small"
                    // helperText="Supplier's Mobile Number"
                  />
                </ListItemText>
              </ListItem>
            </Grid>

            <Grid item xs={12}>
              <ListItem>
                <ListItemIcon>
                  <MonetizationOnIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <TextField
                    required
                    id="salary"
                    name="salary"
                    label="Salary"
                    fullWidth
                    variant="outlined"
                    type="number"
                    // size="small"
                    // helperText="Supplier's Mobile Number"
                  />
                </ListItemText>
              </ListItem>
            </Grid>
            <Grid item xs={12}>
              <ListItem>
                <ListItemIcon>
                  <BusinessCenterIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Position
                    </InputLabel>
                    <Select
                      autoWidth={true}
                      native
                      // value={state.age}
                      // onChange={handleChange}
                      label="Position"
                      inputProps={{
                        name: "role",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={"ROLE_ADMIN"}>Admin</option>
                      <option value={"ROLE_MANAGER"}>Warehouse Manager</option>
                      <option value={"ROLE_CASHIER"}>Cashier</option>
                    </Select>
                  </FormControl>
                </ListItemText>
              </ListItem>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={props.onClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddEmployee.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  maxWidth: PropTypes.string,
};
