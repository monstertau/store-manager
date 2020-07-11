import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { fade, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  CircularProgress,
} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import TextField from "@material-ui/core/TextField";
import { userService, customerService } from "../../_services";
import ProductTable from "./ProductTable";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { numberWithCommas } from "../../_utils";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TransactionDate from "./TransactionDate";
import { billService } from "../../_services/bill.service";
import { AddCustomer } from "../cashier/addCustomer";
import { alertActions } from "../../_actions/alert.actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const useStyles = (theme) => ({
  paper: {
    // height:"95%",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  productStyle: {
    height: "95%",
    margin: theme.spacing(2),
    // padding: theme.spacing(2),
  },
  leftForm: {
    margin: theme.spacing(2),
  },
  belowPaperStyle: {
    height: "85%",
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    display: "block",
    transitionDuration: "0.3s",
  },
  tableStyle: {
    margin: theme.spacing(2),
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.action.disabled, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.action.disabled, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    marginBottom: 20,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ProceedStyle: {
    //   marginLeft: theme.spacing(2),
    //   marginRight: theme.spacing(2),
    // margin: theme.spacing(2),
    height: "70px",
    width: "100%",
    // display:"flex",
  },
  DiscardStyle: {
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
    // margin: theme.spacing(2),
    height: "70px",
    width: "100%",
  },
  buttonStyle: {
    margin: theme.spacing(1),
  },
  listStyle: {
    width: "100%",
  },
  titleStyle: {
    fontWeight: "bold",
  },
  hoveringStyle: {
    "&:hover": {
      backgroundColor: fade(theme.palette.action.disabled, 0.05),
    },
  },
});

class connectedCashierUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        name: "",
        id: "",
        email: "",
      },
      price: {
        subTotal: 0,
        discount: 0,
        tax: 8,
        grandTotal: 0,
        customerPay: 0,
        change: 0,
      },
      cashier: {
        name: "",
        id: "",
      },
      productCart: [],
      allCustomer: [{ id: 0, name: "null" }],
      showDialog: false,
      submitedBill: true,
      showPrintedBill: false,
      billId: null,
    };
  }

  componentDidMount() {
    userService.getUserInfo().then((data) => {
      if (data.success === true) {
        this.setState({
          cashier: {
            name: data.name,
            id: data.id,
          },
        });
        console.log(data);
      }
    });
    customerService.getAll().then((data) => {
      if (data.success === true) {
        this.setState({
          allCustomer: data.customers,
        });
        // console.log(data.customers);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.product !== nextProps.product) {
      const product = nextProps.product;
      const productCartCopy = this.state.productCart.slice();
      const targetIndex = this.state.productCart.findIndex(
        (f) => f.id === product.id
      );
      if (targetIndex !== -1) {
        productCartCopy[targetIndex].quantities += product.quantities;
      } else {
        productCartCopy.push(product);
        this.setState({
          productCart: productCartCopy,
        });
      }
    }
    if (this.props.customerInfo !== nextProps.customerInfo) {
      this.setState({
        showDialog: false,
        customer: {
          name: nextProps.customerInfo.name,
          id: nextProps.customerId,
          email: nextProps.customerInfo.email,
        },
      });
    }
    console.log(this.state);
  }

  quantitiesChange = (index) => (event) => {
    const value = event.target.value;
    const newproductCart = this.state.productCart.slice();

    if (value) {
    }
    newproductCart[index].quantities = parseInt(value);

    this.setState({
      productCart: newproductCart,
    });
    console.log(event.target.value);
  };
  handleDeleteProduct = (index) => {
    const productCartCopy = this.state.productCart.slice();
    productCartCopy.splice(index, 1);
    this.setState({
      productCart: productCartCopy,
    });
    console.log(index);
  };
  handleDiscard = () => {
    this.setState({
      productCart: [],
      customer: {
        name: "",
        id: "",
        email: "",
      },
    });
  };
  handleProceed = () => {
    if (this.state.productCart.length >= 1) {
      this.setState({
        submitedBill: false,
      });
      const newSell = {
        user_id: this.state.cashier.id,
        tax: this.state.price.tax / 100,
        total: parseInt(
          this.state.productCart.reduce(
            (subTotal, item) => subTotal + item.price * item.quantities,
            0
          ) *
            (1 + this.state.price.tax / 100)
        ),
        sell_items: [],
      };
      if (this.state.customer.id > 0) {
        newSell.customer_id = this.state.customer.id;
      }
      this.state.productCart.forEach((item) => {
        const sell_item = {};
        sell_item.product_id = item.id;
        sell_item.price = item.price;
        sell_item.quantities = item.quantities;
        newSell.sell_items.push(sell_item);
      });
      setTimeout(() => {
        const total = parseInt(
          this.state.productCart.reduce(
            (subTotal, item) => subTotal + item.price * item.quantities,
            0
          ) *
            (1 + this.state.price.tax / 100)
        );
        if (total) {
          if (this.state.price.customerPay > total) {
            billService.createNewSell(newSell).then((data) => {
              // console.log(data);
              if (data.success === true) {
                this.setState({
                  submitedBill: true,
                  showPrintedBill: true,
                  billId: data.id,
                });
                this.handleDiscard();
                this.props.alertSuccess("Buy success!");
              } else {
                this.setState({
                  submitedBill: true,
                });
                this.props.alertError(data.message);
              }
            });
          } else {
            this.props.alertError("Customer Pay sufficient fund!");
            this.setState({
              submitedBill: true,
            });
          }
        } else {
          this.props.alertError("Wrong Quantity Input!");
          this.setState({
            submitedBill: true,
          });
        }
      }, 1000);
    } else {
      this.props.alertError("Cart must not empty!");
    }
  };
  handlePrintBill = () => {
    if (this.state.billId) {
      window.open(`http://localhost:3000/invoice-print/${this.state.billId}`);
      this.setState({
        showPrintedBill: false,
      });
    }
  };
  handleChooseCustomer = (event, value) => {
    if (value === null) {
      this.setState({
        customer: {
          name: "",
          id: "",
          email: "",
        },
      });
    } else {
      this.setState({
        customer: {
          name: value.name,
          id: value.id,
          email: value.email,
        },
      });
    }
  };
  handleBillClose = () => {
    this.setState({
      showPrintedBill: false,
    });
  };
  handleChange = (name) => ({ target: { value } }) => {
    console.log(this.state.price.customerPay);
    this.setState({
      price: {
        ...this.state.price,
        [name]: value,
      },
    });
  };
  handleAddCustomer = () => {
    this.setState({
      showDialog: true,
    });
  };

  handleClose = () => {
    this.setState({
      showDialog: false,
    });
  };
  render() {
    const { classes } = this.props;

    const CashierInfo = () => {
      return (
        <React.Fragment>
          <Grid item xs={12} sm={4}>
            <div className={classes.titleStyle}>Cashier</div>
          </Grid>
          <Grid item xs={12} sm={8}>
            {this.state.cashier.name}
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.titleStyle}>Cashier ID</div>
          </Grid>
          <Grid item xs={12} sm={8}>
            {this.state.cashier.id}
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.titleStyle}>Transaction Date</div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TransactionDate />
          </Grid>
        </React.Fragment>
      );
    };
    const TransactionInfo = () => {
      return (
        <React.Fragment>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle1" style={{ color: "#8a8e94" }}>
              Sub-Total
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
            <Typography variant="subtitle1">
              {numberWithCommas(
                this.state.productCart.reduce(
                  (subTotal, item) => subTotal + item.price * item.quantities,
                  0
                )
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle1" style={{ color: "#8a8e94" }}>
              Discount
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
            <Typography variant="subtitle1">
              {this.state.price.discount} %
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle1" style={{ color: "#8a8e94" }}>
              Tax
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
            <Typography variant="subtitle1">
              {this.state.price.tax} %
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", marginTop: "3vh" }}
            >
              Total (
              {this.state.productCart.reduce(
                (subTotal, item) => subTotal + item.quantities,
                0
              )}
              )
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", marginTop: "3vh" }}
            >
              {numberWithCommas(
                parseInt(
                  this.state.productCart.reduce(
                    (subTotal, item) => subTotal + item.price * item.quantities,
                    0
                  ) *
                    (1 + this.state.price.tax / 100)
                )
              )}
            </Typography>
          </Grid>
        </React.Fragment>
      );
    };
    const ButtonAction = () => {
      return (
        <React.Fragment>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.DiscardStyle}
              onClick={() => this.handleDiscard()}
            >
              DISCARD
            </Button>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Button
              variant="contained"
              color="primary"
              className={classes.ProceedStyle}
              onClick={() => this.handleProceed()}
              fullWidth
            >
              {this.state.submitedBill ? (
                "PROCEED"
              ) : (
                <CircularProgress color="secondary" />
              )}
            </Button>
          </Grid>
        </React.Fragment>
      );
    };
    return (
      <div style={{ padding: "10px 15px" }}>
        <Dialog
          open={this.state.showPrintedBill}
          onClose={this.handleBillClose}
        >
          <DialogTitle id="alert-dialog-title">{"Print Invoice?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to print the invoice?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleBillClose} color="primary">
              No
            </Button>
            <Button onClick={this.handlePrintBill} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container>
          
          {/* <Grid item xs={12} container> */}
          <Grid item xs={4}>
            <Paper className={classes.productStyle}>
              <div style={{ backgroundColor: "#737373", height: "3.5em" }}>
                <ListItem key="shopping-cart">
                  <ListItemIcon>
                    <ShoppingCartIcon style={{ color: "#F2F2F2" }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="subtitle1"
                      style={{ color: "#F2F2F2" }}
                    >
                      Customer's Cart
                    </Typography>
                  </ListItemText>
                </ListItem>
              </div>
              <div style={{ maxHeight: 500, overflow: "auto" }}>
                {/* <ProductAdder /> */}
                {this.state.productCart.length < 1 ? (
                  <Grid container style={{ marginTop: "10vh" }}>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                      <RemoveShoppingCartIcon style={{ color: "#3F413C" }} />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                      <Typography
                        variant="subtitle1"
                        style={{ color: "#1E1F1A" }}
                      >
                        Empty Cart
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <React.Fragment>
                    <List className={classes.listStyle}>
                      {this.state.productCart.map((item, index) => {
                        return (
                          <>
                            <ListItem
                              divider
                              className={classes.hoveringStyle}
                              key={index}
                            >
                              <Grid container>
                                <Grid item xs={8}>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="h6"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {item.name}
                                      </Typography>
                                    }
                                    secondary={
                                      <div>
                                        <div>ProductID: {item.id}</div>
                                        <div>Unit: {item.unit}</div>
                                      </div>
                                    }
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <ListItemText
                                    primary={
                                      <React.Fragment>
                                        <div>
                                          <TextField
                                            key={index}
                                            name={"product" + index}
                                            id={"product" + index}
                                            variant="outlined"
                                            style={{
                                              width: "90%",
                                              marginBottom: "1vh",
                                              marginTop: "1vh",
                                            }}
                                            size="small"
                                            type="number"
                                            onChange={this.quantitiesChange(
                                              index
                                            )}
                                            InputProps={{
                                              inputProps: {
                                                min: 1,
                                              },
                                            }}
                                            value={item.quantities}
                                          />
                                          <div>
                                            <div style={{ fontSize: "16px" }}>
                                              Price:{" "}
                                              {numberWithCommas(item.price)}
                                            </div>
                                            <div
                                              style={{
                                                fontWeight: "bold",
                                                fontSize: "17px",
                                              }}
                                            >
                                              Total:{" "}
                                              {numberWithCommas(
                                                item.price * item.quantities
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </React.Fragment>
                                    }
                                  />
                                </Grid>
                                <Grid item xs={1}>
                                  <ListItemSecondaryAction>
                                    <IconButton
                                      edge="end"
                                      aria-label="Delete"
                                      key="buttonDelete"
                                      onClick={() =>
                                        this.handleDeleteProduct(index)
                                      }
                                    >
                                      <DeleteOutlineIcon color="secondary" />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </Grid>
                              </Grid>
                            </ListItem>
                          </>
                        );
                      })}
                    </List>
                  </React.Fragment>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <ProductTable />
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.belowPaperStyle}>
              <Grid container>
                <TransactionInfo />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={8} container>
            <Grid item xs={12} sm={6} container>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={this.state.allCustomer}
                      onChange={this.handleChooseCustomer}
                      getOptionLabel={(option) => option.name}
                      renderOption={(option) => (
                        <React.Fragment>
                          {option.name} - Phone: {option.mobileNo} - ID: {option.id}
                        </React.Fragment>
                      )}
                      // style={{ width: 300 }}
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          key="searchCustomer"
                          id="searchCustomer"
                          name="searchCustomer"
                          {...params}
                          label="Search Customer..."
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => this.handleAddCustomer()}
                    >
                      Create New
                    </Button>
                    <AddCustomer
                      open={this.state.showDialog}
                      onClose={this.handleClose}
                      maxWidth="sm"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className={classes.titleStyle}> Customer Name</div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {this.state.customer.name.length >= 1 ? (
                      <>{this.state.customer.name}</>
                    ) : (
                      "New Customer"
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div className={classes.titleStyle}>Customer ID</div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {this.state.customer.id}
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.titleStyle}>
                    Customer Pay
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      key={99}
                      id="customerPay"
                      name="customerPay"
                      type="number"
                      size="small"
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      defaultValue={this.state.price.customerPay}
                      onChange={this.handleChange("customerPay")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} className={classes.titleStyle}>
                    Change
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {this.state.price.customerPay >
                    parseInt(
                      this.state.productCart.reduce(
                        (subTotal, item) =>
                          subTotal + item.price * item.quantities,
                        0
                      ) *
                        (1 + this.state.price.tax / 100)
                    )
                      ? this.state.price.customerPay -
                        parseInt(
                          this.state.productCart.reduce(
                            (subTotal, item) =>
                              subTotal + item.price * item.quantities,
                            0
                          ) *
                            (1 + this.state.price.tax / 100)
                        )
                      : "0"}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} container>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid container spacing={1}>
                    <CashierInfo />
                  </Grid>
                </Paper>
              </Grid>
              <Grid item container className={classes.buttonStyle} spacing={1}>
                <ButtonAction />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { alert } = state;
  const { product } = state.productAdder;
  const { customerInfo, customerId } = state.customer;
  return {
    alert,
    product,
    customerInfo,
    customerId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    alertSuccess: (message) => dispatch(alertActions.success(message)),
    alertError: (message) => dispatch(alertActions.error(message)),
    alertClear: () => dispatch(alertActions.clear()),
  };
};
const CashierUIStyles = withStyles(useStyles)(connectedCashierUI);
const CashierUI = connect(mapStateToProps, mapDispatchToProps)(CashierUIStyles);
export default CashierUI;
