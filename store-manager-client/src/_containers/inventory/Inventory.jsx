/* eslint-disable */
import React, { useEffect, forwardRef } from "react";
import MaterialTable, { MTableBody } from "material-table";
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
import { inventoryService } from "../../_services/inventory.service";
import { connect } from "react-redux";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { alertActions } from "../../_actions/alert.actions";
import CustomAlert from "../../_components/common/CustomAlert";
import { validateService } from "../../_services/validate.service";
import TablePagination from "@material-ui/core/TablePagination";
import "./inventory.css";
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

function connectedInventory(props) {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "ID",
        field: "id",
        editable: "never",
        width: "8%",
        cellStyle: { whiteSpace: "nowrap" },
        filterCellStyle: { display: "hidden" },
      },
      {
        title: "Name",
        field: "name",
        width: "25%",
        cellStyle: {
          minWidth: "18rem",
        },
        headerStyle: { minWidth: "18rem" },
      },
      {
        title: "Unit",
        field: "unit",
        width: "20%",
      },
      {
        title: "Barcode",
        field: "barcode",
        width: "20%",
      },
      {
        title: "Price",
        field: "price",
        type: "numeric",
        width: "15%",
      },
      {
        width: "10%",
        title: "Quantities",
        field: "quantities",
        type: "numeric",
        cellStyle: {
          paddingLeft: "15px",
          width: "100px",
          whiteSpace: "nowrap",
        },
      },
    ],
    data: [],
    // search: {
    //   value: "",
    //   name: "",
    //   unit: "",
    //   barcode: "",
    // },
    search: "",
    pageNumber: 0,
    numberRowPerPage: 5,
    recordsTotal: 0,
  });
  const handleChangeSearch = async (e) => {
    new Promise(async (resolve, reject) => {
      let result = await inventoryService.getProduct(
        0,
        state.numberRowPerPage,
        e
      );
      if (result.success === false) {
        props.alertError(result.message);
        reject();
      } else {
        setState({
          ...state,
          data: result.data,
          recordsTotal: result.recordsFiltered,
          pageNumber: 0,
          search: e,
        });
        resolve();
      }
    });
  };
  const handleChangePage = async (page) => {
    new Promise(async (resolve, reject) => {
      let result = await inventoryService.getProduct(
        state.numberRowPerPage * page,
        state.numberRowPerPage,
        state.search
      );
      if (result.success === false) {
        props.alertError(result.message);
        reject();
      } else {
        setState({
          ...state,
          data: result.data,
          recordsTotal: result.recordsFiltered,
          pageNumber: page,
        });
        resolve();
      }
    });
  };
  const handleChangeRowPerPage = async (pageSize) => {
    props.alertClear();
    new Promise(async (resolve, reject) => {
      let result = await inventoryService.getProduct(0, pageSize, state.search);
      if (result.success == false) {
        props.alertError(result.message);
        reject();
      } else {
        setState({
          ...state,
          data: result.data,
          recordsTotal: result.recordsFiltered,
          pageNumber: 0,
          numberRowPerPage: pageSize,
        });
        resolve();
      }
    });
  };
  const handleCloseAlert = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    props.alertClear();
    new Promise(async (resolve, reject) => {
      var result = await inventoryService.getProduct(
        state.pageNumber,
        state.numberRowPerPage,
        state.search
      );
      if (result.success == false) {
        props.alertError(result.message);
      }
      setState({
        ...state,
        data: result.data,
        recordsTotal: result.recordsFiltered,
        open: true,
      });
      resolve();
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
          title="Inventory"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  let newProductMsg = await inventoryService.addProduct(
                    newData
                  );
                  if (newProductMsg.success === true) {
                    props.alertSuccess("Created sucessful!");
                    var result = await inventoryService.getProduct(
                      0,
                      state.numberRowPerPage,
                      ""
                    );
                    setState((prevState) => {
                      // const data = [...prevState.data];
                      // data.push({ ...newData, id: newProductMsg.id });
                      return {
                        ...prevState,
                        data: result.data,
                        recordsTotal: resolve.recordsTotal,
                        pageNumber: Math.ceil(
                          state.recordsTotal / state.numberRowPerPage
                        ),
                        open: true,
                      };
                    });
                    handleChangePage(
                      state.recordsTotal % state.numberRowPerPage == 0
                        ? Math.ceil(state.recordsTotal / state.numberRowPerPage)
                        : Math.ceil(
                            state.recordsTotal / state.numberRowPerPage
                          ) - 1
                    );
                    resolve();
                  } else {
                    setState({ ...state, open: true });
                    props.alertError(newProductMsg.message);
                    reject();
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
                  } else {
                    var updateMsg = await inventoryService.updateProduct(
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
                  let msgRemove = await inventoryService.deleteProduct(
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
            // search: true,
            actionsColumnIndex: -1,
            // pageSizeOptions: [5, 10, 15],
            headerStyle: {
              backgroundColor: "#EEE",
              fontSize: "16px",
            },
            // filtering: true,
            // tableLayout: "auto",
            emptyRowsWhenPaging: true,
          }}
          icons={tableIcons}
          onSearchChange={handleChangeSearch}
          // localization={{
          //   pagination: {
          //     labelDisplayedRows: '{from}-{to} of filtered {count} records':''},
          //   },
          // }}
          components={{
            Pagination: (props) => (
              <TablePagination
                {...props}
                rowsPerPageOptions={[5, 10, 15]}
                rowsPerPage={state.numberRowPerPage}
                count={state.recordsTotal}
                // page={firstLoad ? state.pageNumber : state.pageNumber - 1}
                page={state.pageNumber}
                onChangePage={(e, page) => {
                  handleChangePage(page);
                }}
                onChangeRowsPerPage={(event) => {
                  props.onChangeRowsPerPage(event);
                  handleChangeRowPerPage(event.target.value);
                }}
              />
            ),
            // Body: (props) => (
            //   <MTableBody
            //     {...props}
            //     onFilterChanged={async (columnId, value) => {
            //       props.onFilterChanged(columnId, value);
            //       console.log(columnId, value);
            //       setState({ ...state, search: {} });
            //     }}
            //   />
            // ),
          }}
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
const Inventory = connect(
  mapStateToProps,
  mapDispatchToProps
)(connectedInventory);
export default Inventory;
