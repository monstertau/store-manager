/* eslint-disable */
import React, { useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { customerService } from "../../_services/customer.service";
import { connect } from "react-redux";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { alertActions } from "../../_actions/alert.actions";
import CustomAlert from "../../_components/common/CustomAlert";
import "./style.css";
import { validateService } from "../../_services/validate.service";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  VpnKeyIcon: forwardRef((props, ref) => <VpnKeyIcon {...props} ref={ref} />),
};

function connectedCustomer(props) {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "ID",
        field: "id",
        editable: "never",
        width: "1%",
        cellStyle: { whiteSpace: "nowrap" },
      },
      {
        title: "Name",
        field: "name",
      },
      { title: "Email", field: "email" },
      {
        title: "Mobile Number",
        field: "mobileNo",
      },
      {
        title: "Address",
        field: "address",
      },
    ],
    alert: { type: "", message: "" },
    data: [],
  });
  const handleCloseAlert = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    props.alertClear();
    new Promise(async (resolve, reject) => {
      var result = await customerService.getAll();
      if (result.success == false) {
        props.alertError(result.message);
      }
      resolve();
      setState({ ...state, page: 0, data: result.customers, open: true });
    });
  }, []);
  return (
    <div>
      {props.alert.message && (
        <CustomAlert
          open={state.open}
          autoHideDuration={2000}
          type={props.alert.type}
          onClose={handleCloseAlert}
          message={props.alert.message.toUpperCase()}
        />
      )}
      <div style={{ padding: "10px 15px" }}>
        <MaterialTable
          title="Customer"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  if (
                    newData.email &&
                    (await validateService.validateEmail(newData.email))
                  ) {
                    props.alertError("Invalid input Email!");
                    setState({ ...state, open: true });
                    return reject();
                  } else if (
                    newData.mobileNo &&
                    (await validateService.validateMobileNumber(
                      newData.mobileNo
                    ))
                  ) {
                    props.alertError("Invalid input phone number!");
                    setState({ ...state, open: true });
                    return reject();
                  } else {
                    let newCustomerMsg = await customerService.addCustomer(
                      newData
                    );
                    if (newCustomerMsg.success === true) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data.push({ ...newData, id: newCustomerMsg.id });
                        return { ...prevState, data, open: true };
                      });
                      props.alertSuccess("Created sucessful!");
                      resolve();
                    } else {
                      setState({ ...state, open: true });
                      props.alertError(newCustomerMsg.message);
                      reject();
                    }
                  }
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  if (await validateService.compareUser(newData, oldData)) {
                    props.alertError("There are no change from before!");
                    setState({ ...state, open: true });
                    return reject();
                  } else if (
                    await validateService.validateEmail(newData.email)
                  ) {
                    props.alertError("Invalid input Email!");
                    setState({ ...state, open: true });
                    return reject();
                  } else if (
                    newData.mobileNo &&
                    (await validateService.validateMobileNumber(
                      newData.mobileNo
                    ))
                  ) {
                    props.alertError("Invalid input phone number!");
                    setState({ ...state, open: true });
                    return reject();
                  } else {
                    var updateMsg = await customerService.updateCustomer(
                      newData
                    );
                    if (updateMsg.success === true) {
                      setState((prevState) => {
                        let dataUpdate = [...prevState.data];
                        let index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        return { ...prevState, data: dataUpdate, open: true };
                      });
                      props.alertSuccess(updateMsg.message);
                      resolve();
                    } else {
                      setState({ ...state, open: true });
                      props.alertError(updateMsg.message);
                      reject();
                    }
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  let msgRemove = await customerService.deleteCustomer(
                    oldData.id
                  );
                  if (msgRemove.success === true) {
                    setState((prevState) => {
                      let dataDelete = [...prevState.data];
                      let index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      return { ...prevState, data: dataDelete, open: true };
                    });
                    props.alertSuccess(msgRemove.message);
                    resolve();
                  } else {
                    setState({ ...state, open: true });
                    props.alertError(msgRemove.message);
                    reject();
                  }
                }, 600);
              }),
          }}
          options={{
            search: true,
            actionsColumnIndex: -1,
            pageSizeOptions: [5, 10, 15],
            headerStyle: {
              backgroundColor: "#EEE",
              fontSize: "16px",
            },
          }}
          icons={tableIcons}
        />
      </div>
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
const Customer = connect(
  mapStateToProps,
  mapDispatchToProps
)(connectedCustomer);
export default Customer;
