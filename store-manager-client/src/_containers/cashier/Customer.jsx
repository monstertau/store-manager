/* eslint-disable */
import React, { useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import { customerService } from "../../_services/customer.service";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";
import CustomAlert from "../../_components/common/CustomAlert";
import "./style.css";
import { validateService } from "../../_services/validate.service";
import tableIcons from "../../_utils/tableIcon";
import { AddCustomer } from "./addCustomer";

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
    dialogOpen: false,
  });
  const handleCloseAlert = () => {
    setState({ ...state, open: false });
    props.alertClear();
  };
  const handleCustomerAddClose = () => {
    setState({
      ...state,
      dialogOpen: false,
    });
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
          open={props.alert.alertPopUp}
          autoHideDuration={2000}
          type={props.alert.type}
          onClose={handleCloseAlert}
          message={props.alert.message.toUpperCase()}
        />
      )}
      <div style={{ padding: "10px 15px" }}>
        <AddCustomer
          open={state.dialogOpen}
          onClose={handleCustomerAddClose}
          maxWidth="sm"
          onSubmit={handleCustomerAddClose}
        />
        <MaterialTable
          title="Customer"
          columns={state.columns}
          data={state.data}
          editable={{
            // onRowAdd: (newData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(async () => {
            //       if (
            //         newData.email &&
            //         (await validateService.validateEmail(newData.email))
            //       ) {
            //         props.alertError("Invalid input Email!");
            //         setState({ ...state, open: true });
            //         return reject();
            //       } else if (
            //         newData.mobileNo &&
            //         (await validateService.validateMobileNumber(
            //           newData.mobileNo
            //         ))
            //       ) {
            //         props.alertError("Invalid input phone number!");
            //         setState({ ...state, open: true });
            //         return reject();
            //       } else {
            //         let newCustomerMsg = await customerService.addCustomer(
            //           newData
            //         );
            //         if (newCustomerMsg.success === true) {
            //           setState((prevState) => {
            //             const data = [...prevState.data];
            //             data.push({ ...newData, id: newCustomerMsg.id });
            //             return { ...prevState, data, open: true };
            //           });
            //           props.alertSuccess("Created sucessful!");
            //           resolve();
            //         } else {
            //           setState({ ...state, open: true });
            //           props.alertError(newCustomerMsg.message);
            //           reject();
            //         }
            //       }
            //     }, 600);
            //   }),
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
          actions={[
            {
              icon: tableIcons.Add,
              tooltip: "Add Customer",
              position: "toolbar",
              onClick: (event, rowData) => {
                setState({
                  ...state,
                  dialogOpen: true,
                });
              },
            },
          ]}
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
