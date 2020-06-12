import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";
import { invoiceService } from "../../_services";
import CustomAlert from "../../_components/common/CustomAlert";
import { debounce, IconButton } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import { validateService } from "../../_services/validate.service";
import { billService } from "../../_services/bill.service";
import Chip from "@material-ui/core/Chip";
import "./bill.css";
import tableIcons from "../../_utils/tableIcon";
const column = [
  {
    title: "ID",
    field: "id",
    editable: "never",
    width: "1%",
    cellStyle: { whiteSpace: "nowrap" },
  },

  { title: "Create At", field: "createdAt", required: true },
  {
    title: "UserID",
    field: "user_id",
    width: "10%",
  },
  {
    title: "Create By",
    field: "user_name",
  },

  {
    title: "Status",
    field: "active",
    // type: "boolean",
    width: "15%",
    render: (rowData) => {
      return rowData.active ? (
        <Chip label="Completed" color="primary" />
      ) : (
        <Chip label="Discarded" color="secondary" />
      );
    },
  },
  {
    title: "#Items",
    field: "buy_item",
    type: "numeric",
    width: "10%",
    render: (rowData) => <div>{rowData.buy_items.length}</div>,
  },
];
function ConnectedBill(props) {
  const [state, setState] = React.useState({
    data: [],
    search: {},
    pageNumber: 0,
    numberRowPerPage: 5,
    recordsTotal: 0,
  });
  const handleChangeSearch = async (e) => {
    new Promise(async (resolve, reject) => {
      let result = await invoiceService.searchInvoice(
        0,
        state.numberRowPerPage,
        { purpose: e, description: e }
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
          search: { purpose: e, description: e },
        });
        resolve();
      }
    });
  };
  const handleCloseAlert = () => {
    setState({ ...state, open: false });
  };
  const handleChangePage = async (page) => {
    new Promise(async (resolve, reject) => {
      let result = await invoiceService.searchInvoice(
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
      let result = await invoiceService.searchInvoice(
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
      var result = await billService.searchBuy(
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
          open={state.open}
          autoHideDuration={2000}
          type={props.alert.type}
          onClose={handleCloseAlert}
          message={props.alert.message.toUpperCase()}
        />
      )}
      <div>
        <MaterialTable
          title="Bill View"
          columns={column}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  let newSuppilierMsg = await invoiceService.createInvoice(
                    newData
                  );
                  if (newSuppilierMsg.success === true) {
                    props.alertSuccess("Created sucessful!");
                    var result = await invoiceService.searchInvoice(
                      0,
                      state.numberRowPerPage,
                      ""
                    );
                    setState((prevState) => {
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
                    props.alertError(newSuppilierMsg.message);
                    reject();
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  let msgRemove = await invoiceService.deleteInvoice(
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
              icon: tableIcons.View,
              tooltip: "Details",
              onClick: (event, rowData) =>
                rowData.buy_items.map((value) => {
                  console.log(value);
                }),
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
const Bill = connect(mapStateToProps, mapDispatchToProps)(ConnectedBill);
export { Bill };
