import "date-fns";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { connect } from "react-redux";
import { dateActions } from "../../_actions/date.actions";
import { alertActions } from "../../_actions/alert.actions";
import Search from "@material-ui/icons/Search";
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
const useStyles = makeStyles((theme) => ({
  outlinePicker: {
    // margin: "0 auto",
    // marginLeft: "12px",
    // marginRight: "4rem",
  },
  datePicker: {
    width: "100%",
  },
  buttonPicker: {
    maxWidth: "144px",
    height: "39px",
    margin: "auto",
  },
}));

function ConnectedSearchWithDate(props) {
  const classes = useStyles();
  const date = new Date();
  const [state, setState] = React.useState({
    startDate: new Date(date.getFullYear(), date.getMonth(), 1),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
  });
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      await props.dateClear();
      props.getStartDateSuccess(state.startDate);
      props.getEndDateSuccess(state.endDate);
      resolve();
    });
  }, []);
  const handleStartDateChange = (date) => {
    if (!isValidDate(date)) {
      props.startDateError();
      props.alertError("The Start Date Was Invalid!");
    } else {
      setState({
        ...state,
        startDate: date,
      });
      props.getStartDateSuccess(date);
    }
  };
  const handleEndDateChange = (date) => {
    if (!isValidDate(date)) {
      props.endDateError();
      props.alertError("The End Date Was Invalid!");
    } else {
      setState({
        ...state,
        endDate: date,
      });
      props.getEndDateSuccess(date);
    }
  };
  const handleSubmitDate = () => {
    console.log(state);
  };
  const handleThisMonthChange = () => {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    props.getStartDateSuccess(startDate);
    props.getEndDateSuccess(endDate);
    setState({
      ...state,
      startDate: startDate,
      endDate: endDate,
    });
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={4} className={classes.outlinePicker}>
        <Grid container item xs={12} sm={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            className={classes.datePicker}
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Start Date"
            value={state.startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Grid container item xs={12} sm={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="End Date"
            value={state.endDate}
            onChange={handleEndDateChange}
            className={classes.datePicker}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Grid container item xs={12} sm={2}>
          <Button
            className={classes.buttonPicker}
            variant="contained"
            size="large"
            color="primary"
            onClick={handleThisMonthChange}
            style={{ backgroundColor: "#F27E63" }}
          >
            This month
          </Button>
          {/* <Button
            className={classes.buttonPicker}
            variant="contained"
            size="large"
            color="primary"
            onClick={handleThisMonthChange}
            startIcon={<Search />}
            style={{ backgroundColor: "#D95284" }}
          >
            Search
          </Button> */}
        </Grid>
        {/* <Grid container item xs={12} sm={2}></Grid> */}
      </Grid>
    </MuiPickersUtilsProvider>
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
    dateClear: () => dispatch(dateActions.clearDate()),
    getStartDateSuccess: (startDate) =>
      dispatch(dateActions.getStartDateSuccess(startDate)),
    getEndDateSuccess: (endDate) =>
      dispatch(dateActions.getEndDateSuccess(endDate)),
    startDateError: () => dispatch(dateActions.startDateError()),
    endDateError: () => dispatch(dateActions.endDateError()),
    alertClear: () => dispatch(alertActions.clear()),
    alertSuccess: (message) => dispatch(alertActions.success(message)),
    alertError: (message) => dispatch(alertActions.error()),
  };
};
const SearchWithDate = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSearchWithDate);
export default SearchWithDate;

SearchWithDate.prototype = {
  onSearchChange: PropTypes.func,
};
