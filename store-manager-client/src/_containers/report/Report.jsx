import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";

// import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { reportService } from "../../_services/report.service";
import { numberWithCommas } from "../../_utils";
import { Select } from "@material-ui/core";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // height: "100vh",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 210,
  },
  bestSeller: {
    fontWeight: "500",
    padding: theme.spacing(2),
  },
}));
function ConnectedReport(props) {
  const [state, setState] = React.useState({
    report: {
      length: "5",
      start: "2018-01-30 06:52:05",
      end: "2018-12-30 06:52:05",
    },
    products: [],
    cost: 0,
    revenue: 0,
    profit: 0,
  });
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  useEffect(() => {
    props.alertClear();
    new Promise(async (resolve, reject) => {
      let result = await reportService.getReport(
        state.report.length,
        state.report.start,
        state.report.end
      );
      if (result.success === true) {
        // console.log(result.products);
        setState({
          ...state,
          cost: result.cost,
          revenue: result.revenue,
          products: result.products,
        });
        resolve();
      } else {
        props.alertError(result.message);
        reject();
      }
    });
  }, []);
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}><Chart /></Paper>
            </Grid> */}
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Deposits
                  value={numberWithCommas(state.cost)}
                  title={"Total Cost"}
                  des={
                    "Total cost is made up of buying goods, space cost,employee cost ..."
                  }
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Deposits
                  value={numberWithCommas(state.revenue)}
                  des={
                    "Total Revenue is made up of the frand total of all selling orders ..."
                  }
                  title={"Total Revenue"}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Deposits
                  value={numberWithCommas(state.revenue - state.cost)}
                  des={
                    "Profit is the difference of Total Cost and Total Revenue ..."
                  }
                  title={"Profit"}
                />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper>
                <Typography
                  component="p"
                  variant="h5"
                  className={classes.bestSeller}
                >
                  Best selling
                </Typography>
                <Divider />
                <Orders
                  products={state.products}
                  data={[
                    { column: "Name", row: "name", type: "text" },
                    { column: "Unit", row: "unit", type: "text" },
                    { column: "Barcode", row: "barcode", type: "text" },
                    { column: "Price", row: "price", type: "dotNumber" },
                    { column: "Quantities", row: "quantities", type: "text" },
                    {
                      column: "Sold Quantities",
                      row: "sold_quantities",
                      type: "text",
                    },
                  ]}
                />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    alertSuccess: (message) => dispatch(alertActions.success(message)),
    alertError: (message) => dispatch(alertActions.error(message)),
    alertClear: () => dispatch(alertActions.clear()),
  };
};
const Report = connect(mapStateToProps, mapDispatchToProps)(ConnectedReport);
export default Report;
