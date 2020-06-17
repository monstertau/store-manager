import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { fade, withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { userService } from "../../_services";
import Inventory from "../inventory/Inventory";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
const useStyles = (theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
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
});
class CashierUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString(),
      customer: {
        name: "New Customer",
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
  }
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
            {this.state.date}
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
              {this.state.price.subTotal}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle1" style={{ color: "#8a8e94" }}>
              Discount
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
            <Typography variant="subtitle1">
              {this.state.price.discount}
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
              Total ({12})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", marginTop: "3vh" }}
            >
              {this.state.price.grandTotal}
            </Typography>
          </Grid>
        </React.Fragment>
      );
    };
    const CustomerInfo = () => {
      return (
        <React.Fragment>
          <Grid item xs={12} sm={8}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Customer…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="secondary">
              New
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.titleStyle}> Customer Name</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            {this.state.customer.name}
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={classes.titleStyle}>Customer ID</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            {this.state.customer.id}
          </Grid>
          <Grid item xs={12} sm={4}>
            Customer Pay
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField type="number" defaultValue="0" size="small" />
          </Grid>

          <Grid item xs={12} sm={4}>
            Change
          </Grid>
          <Grid item xs={12} sm={8}>
            {this.state.price.change}
          </Grid>
        </React.Fragment>
      );
    };
    const ProductAdder = () => {
      return (
        <React.Fragment>
          <List className={classes.listStyle}>
            <ListItem>
              <Grid container>
                <Grid item xs={8}>
                  <ListItemText
                    primary={
                      <Typography variant="h6">Bàn phím dell</Typography>
                    }
                    secondary={
                      <div>
                        <div>ProductID: 2</div>
                        <div>Unit: Pack</div>
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
                            variant="outlined"
                            style={{ width: "90%", marginBottom: "1vh" }}
                            size="small"
                            type="number"
                          ></TextField>
                          <div>
                            <div>Price: 3000</div>
                            <div style={{ fontWeight: "bold" }}>
                              Total: 6000
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={1}>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                      <DeleteOutlineIcon color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={8}>
                  <ListItemText
                    primary={
                      <Typography variant="h6">Bàn phím dell</Typography>
                    }
                    secondary={
                      <div>
                        <div>ProductID: 2</div>
                        <div>Unit: Pack</div>
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
                            variant="outlined"
                            style={{ width: "90%", marginBottom: "3vh" }}
                            size="small"
                            type="number"
                          ></TextField>
                          <div>
                            <div>Price: 3000</div>
                            <div style={{ fontWeight: "bold" }}>
                              Total: 6000
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={1}>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                    <DeleteOutlineIcon color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={8}>
                  <ListItemText
                    primary={
                      <Typography variant="h6">Bàn phím dell</Typography>
                    }
                    secondary={
                      <div>
                        <div>ProductID: 2</div>
                        <div>Unit: Pack</div>
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
                            variant="outlined"
                            style={{ width: "90%", marginBottom: "3vh" }}
                            size="small"
                            type="number"
                          ></TextField>
                          <div>
                            <div>Price: 3000</div>
                            <div style={{ fontWeight: "bold" }}>
                              Total: 6000
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={1}>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                    <DeleteOutlineIcon color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={8}>
                  <ListItemText
                    primary={
                      <Typography variant="h6">Bàn phím dell</Typography>
                    }
                    secondary={
                      <div>
                        <div>ProductID: 2</div>
                        <div>Unit: Pack</div>
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
                            variant="outlined"
                            style={{ width: "90%", marginBottom: "3vh" }}
                            size="small"
                            type="number"
                          ></TextField>
                          <div>
                            <div>Price: 3000</div>
                            <div style={{ fontWeight: "bold" }}>
                              Total: 6000
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                  />
                </Grid>
                <Grid item xs={1}>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                    <DeleteOutlineIcon color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </List>
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
            >
              DISCARD
            </Button>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Button
              variant="contained"
              color="primary"
              className={classes.ProceedStyle}
            >
              PROCEED
            </Button>
          </Grid>
        </React.Fragment>
      );
    };
    return (
      <div style={{ padding: "10px 15px" }}>
        <Grid container>
          {/* <Grid item xs={12} container> */}
          <Grid item xs={4}>
            <Paper
              className={classes.paper}
              style={{ maxHeight: 500, overflow: "auto" }}
            >
              <ProductAdder />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Inventory />
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
                  <CustomerInfo />
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
const CashierUIStyles = withStyles(useStyles)(CashierUI);
export default CashierUIStyles;
