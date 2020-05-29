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

export default function Customer() {
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
      { title: "Username", field: "username" },
      { title: "Email", field: "email" },
      {
        title: "Role",
        field: "roles",
        lookup: {
          ROLE_ADMIN: "ROLE_ADMIN",
          ROLE_CASHIER: "ROLE_CASHIER",
          ROLE_MANAGER: "ROLE_MANAGER",
        },
      },
      {
        title: "Mobile Number",
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
        width: "1%",
        cellStyle: { whiteSpace: "nowrap", paddingLeft: "0" },
      },
    ],
    alert: { type: "", message: "" },
    data: [],
    userResetPass: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ResetPassHandler = async (rowData) => {
    // rowData.password = "1";
    rowData.password = "1";
    let resetPass = await employeeService.updateUser(rowData);
    console.log(resetPass);
  };
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      var result = await employeeService.getAll();
      resolve();
      setState({ ...state, page: 0, data: result.users });
    });
  }, []);
  return (
    <div>
      {state.alert.message !== "" ? (
        <Alert severity={`${state.alert.type}`}>
          {state.alert.message.toUpperCase()}
        </Alert>
      ) : (
        <></>
      )}
      <div style={{ padding: "10px 15px" }}>
        <MaterialTable
          title="Employee Managemnent"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  var newUser = await employeeService.addUser(newData);
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                  resolve();
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  var updateMsg = await employeeService.updateUser(newData);
                  // setState({ ...state, data: dataUpdate });
                  setState((prevState) => {
                    let dataUpdate = [...prevState.data];
                    let index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    return { ...prevState, data: dataUpdate };
                  });
                  resolve();
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  var msgRemove = await employeeService.deleteUser(oldData.id);
                  setState((prevState) => {
                    let dataDelete = [...prevState.data];
                    let index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    return { ...prevState, data: dataDelete };
                  });
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