import React, { useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";
import { supplierService } from "../../_services";
import CustomAlert from "../../_components/common/CustomAlert";
import { debounce } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import { validateService } from "../../_services/validate.service";
import tableIcons from "../../_utils/tableIcon";
import { AddSupplier } from "./addSupplier";

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
  const [state, setState] = React.useState({
    data: [],
    search: "",
    pageNumber: 0,
    numberRowPerPage: 5,
    recordsTotal: 0,
    dialogOpen: false,
  });
  const handleChangeSearch = async (e) => {
    new Promise(async (resolve, reject) => {
      let result = await supplierService.searchSupplier(
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
  const handleCloseAlert = () => {
    setState({ ...state, open: false });
    props.alertClear();
  };
  const handleAddSupplierClose = () => {
    setState({
      ...state,
      dialogOpen: false,
    });
  };
  const handleChangePage = async (page) => {
    new Promise(async (resolve, reject) => {
      let result = await supplierService.searchSupplier(
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
      let result = await supplierService.searchSupplier(
        0,
        pageSize,
        state.search
      );
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
  useEffect(() => {
    props.alertClear();
    new Promise(async (resolve, reject) => {
      var result = await supplierService.searchSupplier(
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
    <div style={{ padding: "10px 15px" }}>
      {props.alert.message && (
        <CustomAlert
          open={props.alert.alertPopUp}
          autoHideDuration={2000}
          type={props.alert.type}
          onClose={handleCloseAlert}
          message={props.alert.message.toUpperCase()}
        />
      )}
      <div>
        <AddSupplier
          open={state.dialogOpen}
          onClose={handleAddSupplierClose}
          maxWidth="sm"
          onSubmit={handleAddSupplierClose}
        />
        <MaterialTable
          title="Supplier Management"
          columns={column}
          editable={{
            // onRowAdd: (newData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(async () => {
            //       if (
            //         newData.email &&
            //         (await validateService.validateEmail(newData.email))
            //       ) {
            //         props.alertError("Invalid input Email!");
            //         setState((prevState) => {
            //           return {
            //             ...prevState,
            //             open: true,
            //           };
            //         });
            //         return reject();
            //       } else if (
            //         newData.mobileNo &&
            //         (await validateService.validateMobileNumber(
            //           newData.mobileNo
            //         ))
            //       ) {
            //         props.alertError("Invalid input Email!");
            //         setState((prevState) => {
            //           return {
            //             ...prevState,
            //             open: true,
            //           };
            //         });
            //         return reject();
            //       } else {
            //         let newSuppilierMsg = await supplierService.createSupplier(
            //           newData
            //         );
            //         if (newSuppilierMsg.success === true) {
            //           props.alertSuccess("Created sucessful!");
            //           var result = await supplierService.searchSupplier(
            //             0,
            //             state.numberRowPerPage,
            //             ""
            //           );
            //           setState((prevState) => {
            //             return {
            //               ...prevState,
            //               data: result.data,
            //               recordsTotal: resolve.recordsTotal,
            //               pageNumber: Math.ceil(
            //                 state.recordsTotal / state.numberRowPerPage
            //               ),
            //               open: true,
            //             };
            //           });
            //           handleChangePage(
            //             state.recordsTotal % state.numberRowPerPage == 0
            //               ? Math.ceil(
            //                   state.recordsTotal / state.numberRowPerPage
            //                 )
            //               : Math.ceil(
            //                   state.recordsTotal / state.numberRowPerPage
            //                 ) - 1
            //           );
            //           resolve();
            //         } else {
            //           setState({ ...state, open: true });
            //           props.alertError(newSuppilierMsg.message);
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
                  } else {
                    var updateMsg = await supplierService.updateSupplierInfo(
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
                  let msgRemove = await supplierService.deleteSupplier(
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
            pageSizeOptions: [5, 10, 15],
            headerStyle: {
              backgroundColor: "#EEE",
              fontSize: "16px",
            },
            emptyRowsWhenPaging: true,
            actionsCellStyle: {
              // display: "flex",
              // justifyContent: "center",
              paddingLeft: 16,
              // width: "100%",
            },
          }}
          actions={[
            {
              icon: tableIcons.Add,
              tooltip: "Add Supplier",
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
          data={state.data}
          onSearchChange={debounce(handleChangeSearch, 600)}
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
const Supplier = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSupplier);
export { Supplier };
