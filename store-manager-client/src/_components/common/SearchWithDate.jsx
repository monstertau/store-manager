import "date-fns";
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { connect } from "react-redux";
import { dateActions } from "../../_actions/date.actions";
import { alertActions } from "../../_actions/alert.actions";
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function ConnectedSearchWithDate(props) {
  const date = new Date();
  const [state, setState] = React.useState({
    startDate: new Date(date.getFullYear(), date.getMonth(), 1),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
  });
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      await props.dateClear();
      resolve();
      props.getStartDateSuccess(state.startDate);

      props.getEndDateSuccess(state.endDate);
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
      <Grid container spacing={3}>
        <Grid container item xs={12} sm={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
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
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Grid container item xs={12} sm={2}>
          <Button
            variant="contained"
            color="Primary"
            onClick={handleThisMonthChange}
          >
            This month
          </Button>
        </Grid>
        <Grid container item xs={12} sm={2}>
          <Button
            variant="contained"
            color="Secondary"
            onClick={handleSubmitDate}
          >
            Update
          </Button>
        </Grid>
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
