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
    mostPaidCustomerList: [],
    revenueDay: {},
    revenueMonth: {},
    loading: false,
    revenueYear: {},
    chart: "",
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
      let result = await reportService.getReport(
        state.report.length,
        yesterday,
        today
      );
      let dashboard = await dashBoard.getDash("2010-01-01 06:52:05", today);
      let revenue = await dashBoard.getRevenue();
      // resolve();
      if (
        result.success === true &&
        dashboard.success !== null &&
        revenue.success === true
      ) {
        await setState({
          ...state,
          revenueDay: {
            lastDay: revenue.lastDay,
            thisDay: revenue.thisDay,
          },
          revenueMonth: {
            lastMonth: revenue.lastMonth,
            thisMonth: revenue.thisMonth,
          },
          revenueYear: {
            lastYear: revenue.lastYear,
            thisYear: revenue.thisYear,
          },
          productsData: result.products,
          mostPaidCustomerList: dashboard.mostPaidCustomerList,
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
          loading: true,
          chart: "month",
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
  const setChart = (e) => {
    setState({ ...state, chart: e });
  };
  // {state.loading?():null}
  return !state.loading ? null : (
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
          {state.chart != "month" ? null : (
            <UsersOverview
              range={setChart}
              chartData={{
                labels: Array.from(new Array(31), (_, i) =>
                  i === 0 ? 1 : i + 1
                ),
                datasets: [
                  {
                    label: "Current Month",
                    fill: "start",
                    data: state.revenueMonth.thisMonth,
                    backgroundColor: "rgba(0,123,255,0.1)",
                    borderColor: "rgba(0,123,255,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "rgb(0,123,255)",
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHoverRadius: 3,
                  },
                  {
                    label: "Past Month",
                    fill: "start",
                    data: state.revenueMonth.lastMonth,
                    backgroundColor: "rgba(255,65,105,0.1)",
                    borderColor: "rgba(255,65,105,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "rgba(255,65,105,1)",
                    borderDash: [3, 3],
                    borderWidth: 1,
                    pointRadius: 0,
                    pointHoverRadius: 2,
                    pointBorderColor: "rgba(255,65,105,1)",
                  },
                ],
              }}
            />
          )}
          {state.chart != "year" ? null : (
            <UsersOverview
              range={setChart}
              chartData={{
                labels: Array.from(new Array(12), (_, i) =>
                  i === 0 ? 1 : i + 1
                ),
                datasets: [
                  {
                    label: "Current Year",
                    fill: "start",
                    data: state.revenueYear.thisYear,
                    backgroundColor: "rgba(0,123,255,0.1)",
                    borderColor: "rgba(0,123,255,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "rgb(0,123,255)",
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHoverRadius: 3,
                  },
                  {
                    label: "Past Year",
                    fill: "start",
                    data: state.revenueYear.lastYear,
                    backgroundColor: "rgba(255,65,105,0.1)",
                    borderColor: "rgba(255,65,105,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "rgba(255,65,105,1)",
                    borderDash: [3, 3],
                    borderWidth: 1,
                    pointRadius: 0,
                    pointHoverRadius: 2,
                    pointBorderColor: "rgba(255,65,105,1)",
                  },
                ],
              }}
            />
          )}
          {state.chart != "day" ? null : (
            <UsersOverview
              range={setChart}
              chartData={{
                labels: Array.from(new Array(24), (_, i) => (i === 0 ? 0 : i)),
                datasets: [
                  {
                    label: "Current Day",
                    fill: "start",
                    data: state.revenueDay.thisDay,
                    backgroundColor: "rgba(0,123,255,0.1)",
                    borderColor: "rgba(0,123,255,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "rgb(0,123,255)",
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHoverRadius: 3,
                  },
                  {
                    label: "Past Day",
                    fill: "start",
                    data: state.revenueDay.lastDay,
                    backgroundColor: "rgba(255,65,105,0.1)",
                    borderColor: "rgba(255,65,105,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "rgba(255,65,105,1)",
                    borderDash: [3, 3],
                    borderWidth: 1,
                    pointRadius: 0,
                    pointHoverRadius: 2,
                    pointBorderColor: "rgba(255,65,105,1)",
                  },
                ],
              }}
            />
          )}
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          style={{
            marginLeft: "5%",
            position: "relative",
            alignItems: "stretch",
          }}
        >
          <Card>
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
                style={{ minHeight: "20.05rem" }}
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
      <Grid container style={{ margin: "20px" }}>
        <Grid item md={4} xs={12}>
          {/* <RedirectDash /> */}
          <Card style={{ marginTop: "10px" }}>
            <CardHeader
              title="Most Paid Customer"
              className={classes.CardHeader}
            ></CardHeader>
            <Divider></Divider>
            <CardContent className={classes.CardContent}>
              <Orders
                products={state.mostPaidCustomerList}
                data={[
                  { column: "Name", row: "customer_id", type: "text" },
                  {
                    column: "Total",
                    row: "total",
                    type: "numberic",
                  },
                ]}
                // style={{ margin: "auto 0", paddingBottom: "5%" }}
              />
              <Grid container className={classes.controlBar}></Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          onClick={(e) => {
            e.preventDefault();
            props.history.push("bill");
          }}
        >
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
