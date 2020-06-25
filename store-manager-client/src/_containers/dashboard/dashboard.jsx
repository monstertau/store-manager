import React, { useEffect } from "react";
import SmallStats from "../../_components/common/smallStats";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UsersOverview from "../../_components/common/ChartOverview";
import { Divider, Card } from "@material-ui/core";
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
const smallStats = [
  {
    label: "Pages",
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
    label: "Posts",
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
    label: "Comments",
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
    label: "Subscribers",
    value: "17,281",
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
];
const useStyles = makeStyles((theme) => ({
  CardHeader: {
    fontSize: "18px !important",
    paddingBottom: 0,
  },
  CardContent: {
    padding: "12px",
    paddingBottom: "12px !important",
  },
  controlBar: {
    padding: "10px 0",
  },
  selectProduct: {
    border: "1px solid #eee !important",
    paddingLeft: "12px",
  },
  buttonRedirect: { marginLeft: "auto", marginRight: 0 },
}));
function ConnectedDashbroad(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    products: {
      data: [],
      search: {
        start: "",
        end: "",
      },
    },
    report: {
      length: "5",
      start: "2018-01-30 06:52:05",
      end: "2018-12-30 06:52:05",
    },
    open: true,
  });
  const handleCloseAlert = () => {
    setState({ ...state, open: false });
  };
  const handleChange = (page) => {
    props.history.push(page);
  };
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
          products: { data: result.products },
        });
      } else {
        props.alertError(result.message);
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
        {smallStats.map((stats, idx) => (
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
        <Grid item md={4} xs={12} style={{ marginLeft: "5%" }}>
          <Card>
            <CardHeader
              title="Most Sold Product"
              className={classes.CardHeader}
            ></CardHeader>
            <CardContent className={classes.CardContent}>
              <Orders
                products={state.products.data}
                data={[
                  { column: "Name", row: "name", type: "text" },
                  {
                    column: "Quantities",
                    row: "sold_quantities",
                    type: "text",
                  },
                ]}
              />
              <Grid container className={classes.controlBar}>
                <Select
                  native
                  value={state.age}
                  className={classes.selectProduct}
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                >
                  <option aria-label="This Month" value="">
                    Today
                  </option>
                  <option value={10}>This Month</option>
                  <option value={20}>This Year</option>
                  <option value={30}>All time</option>
                </Select>
                <Button
                  className={classes.buttonRedirect}
                  size="small"
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("/customers");
                  }}
                >
                  All Customers<span>&rarr;</span>
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          abc
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
