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
import { employeeService } from "../../_services/employee.service";
import Alert from "@material-ui/lab/Alert";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomAlert from "../../_components/common/CustomAlert";
import { validateService } from "../../_services/validate.service";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";

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

function connectedEmployee(props) {
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
        required: true,
      },
      { title: "Username", field: "username", required: true },
      { title: "Email", field: "email", required: true },
      {
        title: "Role",
        field: "roles[0]",
        lookup: {
          ROLE_ADMIN: "ROLE_ADMIN",
          ROLE_CASHIER: "ROLE_CASHIER",
          ROLE_MANAGER: "ROLE_MANAGER",
        },
      },
      {
        title: "MobileNo",
        field: "mobileNo",
      },
      {
        title: "Address",
        field: "address",
      },
      {
        title: "Salary",
        field: "salary",
        type: "numeric",
        a: "1%",
        cellStyle: {
          // whiteSpace: "nowrap",
          paddingLeft: 0,
          paddingRight: "3rem",
          // textAlign: "center",
        },
        headerStyle: {
          // textAlign: "left",
          paddingLeft: 0,
          paddingRight: "3rem",
        },
      },
    ],
    alert: { type: "", message: "" },
    open: true,
    data: [],
    userResetPass: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleCloseAlert = () => {
    setState({ ...state, open: false });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const setOpenAlert = (prevState) => {
    return {
      ...prevState,
      open: true,
    };
  };
  const ResetPassHandler = async (rowData) => {
    // rowData.password = "1";
    rowData.password = "1";
    let resetPassMsg = await employeeService.updateUser(rowData);
    if (resetPassMsg.success === true) {
      props.alertSuccess(resetPassMsg.message);
    } else {
      props.alertError(resetPassMsg.message);
    }
    setState({ ...state, open: true });
  };
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      var result = await employeeService.getAll();
      if (result.success == false) {
        props.alertError(result.message);
      }
      resolve();
      setState({ ...state, page: 0, data: result.users, open: true });
    });
  }, []);

  return (
    <div style={{ padding: "10px 15px" }}>
      {props.alert.message && (
        <CustomAlert
          open={state.open}
          autoHideDuration={2000}
          type={props.alert.type}
          onClose={handleCloseAlert}
          message={props.alert.message.toUpperCase()}
        />
      )}
      <div>
        <MaterialTable
          title="Employee Managemnent"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  if (await validateService.validateEmail(newData.email)) {
                    props.alertError("Invalid input Email!");
                    setState((prevState) => {
                      return {
                        ...prevState,
                        open: true,
                      };
                    });
                    return reject();
                  } else if (
                    newData.mobileNo &&
                    (await validateService.validateMobileNumber(
                      newData.mobileNo
                    ))
                  ) {
                    props.alertError("Invalid input phone number!");
                    setState((prevState) => {
                      return {
                        ...prevState,
                        open: true,
                      };
                    });
                    return reject();
                  } else {
                    let newUserMsg = await employeeService.addUser(newData);
                    if (newUserMsg.success === true) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data.push({ ...newData, id: newUserMsg.id });
                        return { ...prevState, data, open: true };
                      });
                      props.alertSuccess("Created sucessful!");
                      resolve();
                    } else {
                      setState((prevState) => {
                        return {
                          ...prevState,
                          open: true,
                        };
                      });
                      props.alertError(newUserMsg.message);
                      reject();
                    }
                  }
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(async (resolve, reject) => {
                setTimeout(async () => {
                  if (await employeeService.compareUser(newData, oldData)) {
                    setState((prevState) => {
                      props.alertError("There are no change from before!");
                      return {
                        ...prevState,
                        open: true,
                      };
                    });
                    return reject();
                  } else if (
                    await validateService.validateEmail(newData.email)
                  ) {
                    props.alertError("Invalid input Email!");
                    setState((prevState) => {
                      return {
                        ...prevState,
                        open: true,
                      };
                    });
                    return reject();
                  } else if (
                    newData.mobileNo &&
                    (await validateService.validateMobileNumber(
                      newData.mobileNo
                    ))
                  ) {
                    props.alertError("Invalid input phone number!");
                    setState((prevState) => {
                      return {
                        ...prevState,
                        open: true,
                      };
                    });
                    return reject();
                  } else {
                    var updateMsg = await employeeService.updateUser(newData);
                    if (updateMsg.success === true) {
                      props.alertSuccess(updateMsg.message);
                      setState((prevState) => {
                        let dataUpdate = [...prevState.data];
                        let index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        return { ...prevState, data: dataUpdate, open: true };
                      });
                      // console.log(updateMsg);
                    } else {
                      setState((prevState) => {
                        return {
                          ...prevState,
                          open: true,
                        };
                      });
                      props.alertError(updateMsg.message);
                      reject();
                    }
                  }
                  resolve();
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  var msgRemove = await employeeService.deleteUser(oldData.id);
                  if (msgRemove.success === true) {
                    props.alertSuccess(msgRemove.message);
                    setState((prevState) => {
                      let dataDelete = [...prevState.data];
                      let index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      return { ...prevState, data: dataDelete, open: true };
                    });
                  } else {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        open: true,
                      };
                    });
                    props.alertError(msgRemove.message);
                  }
                  resolve();
                }, 600);
              }),
          }}
          actions={[
            {
              icon: VpnKeyIcon,
              tooltip: "Reset default password",
              onClick: (event, rowData) => {
                new Promise((resolve) => {
                  setState((prevState) => {
                    return { ...prevState, userResetPass: rowData };
                  });
                  handleClickOpen();
                  resolve();
                });
              },
            },
          ]}
          options={{
            search: true,
            actionsColumnIndex: -1,
            pageSizeOptions: [5, 10, 15],
            headerStyle: {
              backgroundColor: "#EEE",
              fontSize: "16px",
            },
            actionsCellStyle: {
              // display: "flex",
              // justifyContent: "center",
              paddingLeft: 16,
              // width: "100%",
            },
          }}
          icons={tableIcons}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Confirm Update Password"
      >
        <DialogTitle style={{ cursor: "move" }} id="Confirm Update Password">
          Reset Password
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will reset the password of the user to default password
            which is '1'. Are you sure to reset the password for user
            <em>{" " + state.userResetPass.username}</em>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              ResetPassHandler(state.userResetPass);
              handleClose();
            }}
            color="primary"
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
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
const Employee = connect(
  mapStateToProps,
  mapDispatchToProps
)(connectedEmployee);
export default Employee;
