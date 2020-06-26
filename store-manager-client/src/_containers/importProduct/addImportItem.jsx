import React, { useEffect } from "react";
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
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import FaceIcon from "@material-ui/icons/Face";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import {
  Dialog,
  DialogContentText,
  DialogContent,
  Divider,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import DialpadIcon from '@material-ui/icons/Dialpad';
import { inventoryService } from "../../_services/inventory.service";
import { supplierService } from "../../_services";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { importItemActions } from "../../_actions/importItem.actions";
const useStyles = makeStyles((theme) => ({
  dialog: {
    margin: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    display: "flex",
  },
}));
export function ConnectedAddImportItem(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    allProduct: [],
    allSupplier: [],
    importBill: {
      product_name: "",
      price: 0,
      quantity: 0,
      unit: "",
      supplier_name: "",
      supplier_id: 0,
      product_id: 0,
    },
  });
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      const dataProduct = await inventoryService.getProduct(0, 1000, "");
      const dataSupplier = await supplierService.searchSupplier(0, 1000, "");
      console.log(dataProduct);
      console.log(dataSupplier);
      setState({
        ...state,
        allProduct: dataProduct.data,
        allSupplier: dataSupplier.data,
      });
    });
  }, []);
  const handleChooseProduct = (event, value) => {
    if (value === null) {
      setState({
        ...state,
        importBill: {
          ...state.importBill,
          product_name: "",
          product_id: 0,
          unit: "",
          price: 0,
          quantity: 0,
        },
      });
    } else {
      setState({
        ...state,
        importBill: {
          ...state.importBill,
          product_name: value.name,
          product_id: value.id,
          unit: value.unit,
        },
      });
    }
  };
  const handleChooseSupplier = (event, value) => {
    if (value === null) {
      setState({
        ...state,
        importBill: {
          ...state.importBill,
          supplier_name: "",
          supplier_id: 0,
        },
      });
    } else {
      setState({
        ...state,
        importBill: {
          ...state.importBill,
          supplier_name: value.name,
          supplier_id: value.id,
        },
      });
    }
  };
  const handleQuantityChange = (e) => {
    setState({
      ...state,
      importBill: {
        ...state.importBill,
        quantity: e.target.value,
      },
    });
  };
  const handlePriceChange = (e) => {
    setState({
      ...state,
      importBill: {
        ...state.importBill,
        price: e.target.value,
      },
    });
  };
  const handleSubmit = () => {
    if (
      state.importBill.product_id &&
      state.importBill.price &&
      state.importBill.quantity &&
      state.importBill.supplier_id
    ) {
      props.addedProductClear();
      props.addProduct(state.importBill);
    }
    props.onClose();
  };
  // console.log(state);
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
            Add Import Item
          </Typography>
        </DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <Grid container>
            <Grid item xs={12}>
              <ListItem>
                <ListItemIcon>
                  <ShoppingBasketIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <Autocomplete
                    id="combo-box-demo"
                    options={state.allProduct}
                    onChange={handleChooseProduct}
                    getOptionLabel={(option) => option.name}
                    renderOption={(option) => (
                      <React.Fragment>
                        {option.name} - Unit: {option.unit} - ID: {option.id}
                      </React.Fragment>
                    )}
                    // style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        required
                        key="productName"
                        id="productName"
                        name="productName"
                        {...params}
                        label="Product Name"
                        variant="outlined"
                      />
                    )}
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
                    variant="outlined"
                    type="number"
                    // size="small"
                    // helperText="Supplier's email"
                    // value={state.importBill.price}
                    onChange={handlePriceChange}
                  />
                </ListItemText>
              </ListItem>
            </Grid>

            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemIcon>
                  <FormatListNumberedIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <TextField
                    required
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    fullWidth
                    variant="outlined"
                    // value={state.importBill.quantity}
                    onChange={handleQuantityChange}
                    type="number"
                    // size="small"
                    // helperText="Supplier's address"
                  />
                </ListItemText>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemIcon>
                  <DialpadIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <TextField
                    required
                    id="unit"
                    name="unit"
                    label="Unit"
                    fullWidth
                    disabled
                    value={state.importBill.unit}
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
                  <BusinessIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <Autocomplete
                    id="combo-box-demo-1"
                    options={state.allSupplier}
                    onChange={handleChooseSupplier}
                    getOptionLabel={(option) => option.name}
                    renderOption={(option) => (
                      <React.Fragment>
                        {option.name} - ID: {option.id}
                      </React.Fragment>
                    )}
                    // style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        required
                        key="supplier"
                        id="supplier"
                        name="supplier"
                        {...params}
                        label="Supplier"
                        variant="outlined"
                      />
                    )}
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
const mapStateToProps = (state) => {
  // const { alert } = state;
  return {
    // alert,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // alertSuccess: (message) => dispatch(alertActions.success(message)),
    // alertError: (message) => dispatch(alertActions.error(message)),
    // alertClear: () => dispatch(alertActions.clear()),
    addProduct: (item) => dispatch(importItemActions.addProduct(item)),
    addedProductClear: () => dispatch(importItemActions.addedProductClear),
  };
};
const AddImportItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAddImportItem);
export { AddImportItem };

AddImportItem.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  maxWidth: PropTypes.string,
};
