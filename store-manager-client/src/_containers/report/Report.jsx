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
import Button from "@material-ui/core/Button";
import { dateActions } from "../../_actions/date.actions";

// import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { reportService } from "../../_services/report.service";
import { numberWithCommas } from "../../_utils";
import { Select } from "@material-ui/core";
import { getToday, getFullCurrentDate } from "../../_utils/currentDate";
import SearchWithDate from "../../_components/common/SearchWithDate";

//
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getTime } from "date-fns";
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
      start: "2010-01-30 06:52:05",
    },
    products: [],
    cost: 0,
    revenue: 0,
    expanded: false,
  });
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const defaultSearch = () => {
    new Promise(async (resolve, reject) => {
      // let end = await getFullCurrentDate(new Date(), "-") ;
      let end = await getToday(new Date());
      var result = await reportService.getReport(
        state.report.length,
        state.report.start,
        end
      );
      if (result.success == false) {
        props.alertError(result.message);
      }
      setState({
        ...state,
        cost: result.cost,
        revenue: result.revenue,
        products: result.products,
        open: true,
        expanded: false,
      });
      resolve();
    });
  };
  const searchSellDate = () => {
    new Promise(async (resolve, reject) => {
      var result = await reportService.getReport(
        state.report.length,
        props.dateFilter.startDate,
        props.dateFilter.endDate
      );
      if (result.success == false) {
        props.alertError(result.message);
      }
      setState({
        ...state,
        cost: result.cost,
        revenue: result.revenue,
        products: result.products,
        open: true,
      });
      resolve();
    });
  };
  useEffect(() => {
    props.alertClear();
    props.clearDate();
    new Promise(async (resolve, reject) => {
      let date = await getToday(new Date());
      console.log(date);
      let result = await reportService.getReport(
        state.report.length,
        state.report.start,
        date
      );
      if (result.success === true) {
        // console.log(result.products);
        setState({
          ...state,
          cost: result.cost,
          revenue: result.revenue,
          products: result.products,
        });
      } else {
        props.alertError(result.message);
        reject();
      }
      resolve();
    });
  }, []);
  const collapseExpaned = () => {
    new Promise(async (resolve, reject) => {
      setState({ ...state, expanded: !state.expanded });
      resolve();
    });
  };
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <ExpansionPanel
            expanded={state.expanded}
            style={{ marginBottom: "1rem" }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
              onClick={(e) => {
                e.preventDefault();
                collapseExpaned();
              }}
            >
              <Typography>Advanced Searching</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SearchWithDate />
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button
                size="small"
                onClick={(e) => {
                  new Promise(async (resolve, reject) => {
                    e.preventDefault();
                    defaultSearch();
                    resolve();
                  });
                }}
              >
                Clear
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  searchSellDate();
                }}
              >
                Search
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
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
  const { alert, dateFilter } = state;
  return {
    alert,
    dateFilter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    alertSuccess: (message) => dispatch(alertActions.success(message)),
    alertError: (message) => dispatch(alertActions.error(message)),
    alertClear: () => dispatch(alertActions.clear()),
    clearDate: () => dispatch(dateActions.clearDate()),
  };
};
const Report = connect(mapStateToProps, mapDispatchToProps)(ConnectedReport);
export default Report;
