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
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import PasswordField from "../../_components/common/PasswordField";
import LockIcon from "@material-ui/icons/Lock";
import {
  Dialog,
  DialogContentText,
  DialogContent,
  Divider,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { employeeService } from "../../_services";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";
import { inventoryService } from "../../_services/inventory.service";
const useStyles = makeStyles((theme) => ({
  dialog: {
    margin: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    display: "flex",
  },
}));
function AddItem(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    name: "",
    unit: "",
    barcode: "",
    price: 0,
    quantities: 0,
  });
  const handleChange = (prop) => (event) => {
    setState({
      ...state,
      [prop]: event.target.value,
    });
  };
  const handleSubmit = () => {
    props.alertClear();
    console.log(state);
    inventoryService.addProduct(state).then((data) => {
      if (data.success === true) {
        props.alertSuccess("Add Item Success");
        setTimeout(() => {
          window.location.reload();
          props.onClose();
        }, 1000);
      } else {
        props.alertError(data.message);
      }
    });
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
            Add New Item
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
                    onChange={handleChange("name")}
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
                    id="unit"
                    name="unit"
                    label="Unit"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange("unit")}
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
                    id="barcode"
                    name="barcode"
                    label="Barcode"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange("barcode")}
                    // size="small"
                    // helperText="Supplier's email"
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
                    id="price"
                    name="price"
                    label="Price"
                    fullWidth
                    type="number"
                    variant="outlined"
                    onChange={handleChange("price")}
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
                    id="quantities"
                    name="quantities"
                    label="Quantities"
                    fullWidth
                    variant="outlined"
                    type="number"
                    onChange={handleChange("quantities")}
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
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddItem.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  maxWidth: PropTypes.string,
};
const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {
  return {
    alertSuccess: (message) => dispatch(alertActions.success(message)),
    alertError: (message) => dispatch(alertActions.error(message)),
    alertClear: () => dispatch(alertActions.clear()),
  };
};
const connectedAddItem = connect(mapStateToProps, mapDispatchToProps)(AddItem);
export { connectedAddItem as AddItem };
