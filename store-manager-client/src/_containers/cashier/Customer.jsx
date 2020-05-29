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
import Alert from "@material-ui/lab/Alert";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import "./style.css";
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
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      var result = await customerService.getAll();
      resolve();
      setState({ ...state, page: 0, data: result.customers });
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
          title="Customer"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  let newCustomerMsg = await customerService.addCustomer(
                    newData
                  );
                  if (newCustomerMsg.success === true) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push({ ...newData, id: newCustomerMsg.id });
                      return { ...prevState, data };
                    });
                  } else {
                    console.log(newCustomerMsg.message);
                  }
                  resolve();
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  var updateMsg = await customerService.updateCustomer(newData);
                  if (updateMsg.success === true) {
                    setState((prevState) => {
                      let dataUpdate = [...prevState.data];
                      let index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      return { ...prevState, data: dataUpdate };
                    });
                  } else {
                    console.log(updateMsg.message);
                  }

                  resolve();
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  let msgRemove = await customerService.deleteCustomer(
                    oldData.id
                  );
                  if (msgRemove.success === true) {
                    setState((prevState) => {
                      let dataDelete = [...prevState.data];
                      let index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      return { ...prevState, data: dataDelete };
                    });
                  } else {
                    console.log(msgRemove.message);
                  }

                  resolve();
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
