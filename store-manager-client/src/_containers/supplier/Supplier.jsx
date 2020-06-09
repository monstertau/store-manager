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
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";
import { supplierService } from "../../_services";
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
const column = [
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
    title: "MobileNo",
    field: "mobileNo",
  },
  {
    title: "Address",
    field: "address",
  },
];
function ConnectedSupplier(props) {
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      var result = await supplierService.searchSupplier(1, 5, 5);
      resolve();
      console.log(result);
    });
  }, []);
  return (
    <div style={{ padding: "10px 15px" }}>
      <div>
        <MaterialTable
          title="Supplier Management"
          columns={column}
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
          data={(query) =>
            new Promise((resolve, reject) => {
              let length = query.pageSize;
              let start = query.pageSize * query.page;
              let searchValue = query.search;
              // console.log(
              //   "length=" + length + ",start=" + start,
              //   "search=" + searchValue
              // );
              let search = { value: searchValue };
              // console.log(search);
              supplierService
                .searchSupplier(1, start, length,search)
                .then((result) => {
                  resolve({
                    data: result.data,
                    page: query.page,
                    totalCount: result.recordsTotal,
                  });
                });
            })
          }
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
const Supplier = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSupplier);
export { Supplier };
