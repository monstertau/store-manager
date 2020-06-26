import React, { useEffect } from "react";
import SmallStats from "../../_components/common/smallStats";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UsersOverview from "../../_components/common/ChartOverview";
import { Divider, Card, CardActions } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Order from "../report/Orders";
import { reportService } from "../../_services/report.service";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";
import Orders from "../report/Orders";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CustomAlert from "../../_components/common/CustomAlert";
import { Bill } from "../bill/Bill";
import RedirectDash from "./viewDetail";
import {
  getYesterday,
  getToday,
  getLastMonth,
  getLastYear,
} from "../../_utils/currentDate";
import { dashBoard } from "../../_services/dashboard.service";
import { numberWithCommas } from "../../_utils";
const smallStats = [
  {
    label: "Customer",
    value: "182",
    percentage: "12.4%",
    increase: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(23,198,113,0.1)",
        borderColor: "rgb(23,198,113)",
        data: [1, 2, 3, 3, 3, 4, 4],
      },
    ],
  },
  {
    label: "Revenue",
    value: "2,390",
    percentage: "4.7%",
    increase: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(0, 184, 216, 0.1)",
        borderColor: "rgb(0, 184, 216)",
        data: [1, 2, 1, 3, 5, 4, 7],
      },
    ],
  },
  {
    label: "Average Bill",
    value: "8,147",
    percentage: "3.8%",
    increase: false,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,180,0,0.1)",
        borderColor: "rgb(255,180,0)",
        data: [2, 3, 3, 3, 4, 3, 3],
      },
    ],
  },
  {
    label: "Most Paid",
    value: "17,281",
    percentage: "2.4%",
    increase: true,
    // decrease: false,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgb(0,123,255,0.1)",
        borderColor: "rgb(0,123,255)",
        data: [3, 2, 3, 2, 4, 5, 4],
      },
    ],
  },
];
const useStyles = makeStyles((theme) => ({
  CardHeader: {
    fontSize: "18px !important",
    paddingBottom: 0,
  },
  CardContent: {
    padding: "12px",
    // display: "flex",
    // height: "100%",
    position: "relative",
  },
  controlBar: {
    padding: "20px 0 10px 0",
    // width: "95%",
    // paddingTop: "3%",
    // position: "absolute",
    // height: "100%",
    // verticalAlign: "sub",
  },
  selectProduct: {
    border: "1px solid #eee !important",
    paddingLeft: "12px",
  },
  buttonRedirect: { marginLeft: "auto", marginRight: "0" },
}));
function ConnectedDashbroad(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    productsData: [],
    products: {
      start: "",
      end: "",
    },
    report: {
      length: "5",
      start: "",
      end: "",
    },
    smallStats: [],
    open: true,
  });
  const handleCloseAlert = () => {
    setState({ ...state, open: false });
  };
  const handleChange = (page) => {
    props.history.push(page);
  };
  const handleChangeProduct = async (event) => {
    var choose = event.target.value;
    // new Promise(async (resolve, reject) => {
    var today = new Date();
    var end = await getToday(today);
    var start = "";
    if (choose == 0) {
      start = await getYesterday(today);
    } else if (choose == 1) {
      start = await getLastMonth(today);
    } else if (choose == 2) {
      start = await getLastYear(today);
    } else {
      start = "2010-01-01 06:52:05";
    }
    // resolve();
    // console.log(start, end);
    let result = await reportService.getReport(5, start, end);
    if (result.success === true) {
      // console.log(result.products);
      setState({
        ...state,
        productsData: result.products,
      });
    } else {
      props.alertError(result.message);
    }
    // });
  };
  useEffect(() => {
    props.alertClear();
    new Promise(async (resolve, reject) => {
      let date = new Date();
      let today = await getToday(date);
      let yesterday = await getYesterday(date);
      // console.log(start, end);
      let result = await reportService.getReport(
        state.report.length,
        yesterday,
        today
      );
      let dashboard = await dashBoard.getDash("2010-01-01 06:52:05", today);

      if (result.success === true && dashboard.success !== null) {
        // console.log(result.products);
        setState({
          ...state,
          productsData: result.products,
          smallStats: [
            {
              label: "Customer",
              value: numberWithCommas(dashboard.customerCount),
              percentage: "12.4%",
              increase: true,
              chartLabels: [null, null, null, null, null, null, null],
              attrs: { md: "6", sm: "6" },
              datasets: [
                {
                  label: "Today",
                  fill: "start",
                  borderWidth: 1.5,
                  backgroundColor: "rgba(23,198,113,0.1)",
                  borderColor: "rgb(23,198,113)",
                  data: [1, 2, 3, 3, 3, 4, 4],
                },
              ],
            },
            {
              label: "Revenue",
              value: numberWithCommas(dashboard.revenue),
              percentage: "4.7%",
              increase: true,
              chartLabels: [null, null, null, null, null, null, null],
              attrs: { md: "6", sm: "6" },
              datasets: [
                {
                  label: "Today",
                  fill: "start",
                  borderWidth: 1.5,
                  backgroundColor: "rgba(0, 184, 216, 0.1)",
                  borderColor: "rgb(0, 184, 216)",
                  data: [1, 2, 1, 3, 5, 4, 7],
                },
              ],
            },
            {
              label: "Average Bill",
              value: numberWithCommas(parseInt(dashboard.averagePricePerBill)),
              percentage: "3.8%",
              increase: false,
              decrease: true,
              chartLabels: [null, null, null, null, null, null, null],
              attrs: { md: "4", sm: "6" },
              datasets: [
                {
                  label: "Today",
                  fill: "start",
                  borderWidth: 1.5,
                  backgroundColor: "rgba(255,180,0,0.1)",
                  borderColor: "rgb(255,180,0)",
                  data: [2, 3, 3, 3, 4, 3, 3],
                },
              ],
            },
            {
              label: "Most Paid",
              value: numberWithCommas(dashboard.mostPaidCustomerList[0].total),
              percentage: "2.4%",
              increase: false,
              decrease: true,
              chartLabels: [null, null, null, null, null, null, null],
              attrs: { md: "4", sm: "6" },
              datasets: [
                {
                  label: "Today",
                  fill: "start",
                  borderWidth: 1.5,
                  backgroundColor: "rgb(0,123,255,0.1)",
                  borderColor: "rgb(0,123,255)",
                  data: [3, 2, 3, 2, 4, 5, 4],
                },
              ],
            },
          ],
        });
      } else {
        if (result.success === false) {
          props.alertError(result.message);
        } else if (dashboard.success === false) {
          props.alertError(dashboard.message);
        }
      }
      resolve();
    });
  }, []);
  return (
    <div style={{ padding: "10px 15px", maxWidth: "97%", margin: "0 auto" }}>
      {props.alert.message && (
        <CustomAlert
          open={state.open}
          autoHideDuration={2000}
          type={props.alert.type}
          onClose={handleCloseAlert}
          message={props.alert.message.toUpperCase()}
        />
      )}
      <Grid container justify="center">
        {state.smallStats.map((stats, idx) => (
          // <Paper>
          <Grid item md={3} xs={5} key={idx}>
            <SmallStats
              id={`small-stats-${idx}`}
              variation="1"
              chartData={stats.datasets}
              chartLabels={stats.chartLabels}
              label={stats.label}
              value={stats.value}
              percentage={stats.percentage}
              increase={stats.increase}
              decrease={stats.decrease}
            />
          </Grid>
          // </Paper>
        ))}
      </Grid>
      <Grid container style={{ margin: "20px" }}>
        <Grid item md={7} xs={12}>
          <UsersOverview />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          style={{ marginLeft: "5%", position: "relative" }}
        >
          <Card
          // style={{ height: "100%" }}
          >
            <CardHeader
              title="Most Sold Product"
              className={classes.CardHeader}
            ></CardHeader>
            <Divider></Divider>
            <CardContent className={classes.CardContent}>
              <Orders
                products={state.productsData}
                data={[
                  { column: "Name", row: "name", type: "text" },
                  {
                    column: "Quantities",
                    row: "sold_quantities",
                    type: "text",
                  },
                ]}
                // style={{ margin: "auto 0", paddingBottom: "5%" }}
              />
              <Grid container className={classes.controlBar}>
                <Select
                  native
                  value={state.rAge}
                  className={classes.selectProduct}
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                  onChange={handleChangeProduct}
                >
                  <option aria-label="This Month" value={0}>
                    Today
                  </option>
                  <option value={1}>This Month</option>
                  <option value={2}>This Year</option>
                  <option value={3}>All time</option>
                </Select>
                <Button
                  className={classes.buttonRedirect}
                  size="small"
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("/inventory");
                  }}
                >
                  All Inventory<span>&rarr;</span>
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <RedirectDash />
        </Grid>
        <Grid item xs={8}>
          <Bill />
        </Grid>
      </Grid>
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
const DashBroad = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedDashbroad);
export default DashBroad;
