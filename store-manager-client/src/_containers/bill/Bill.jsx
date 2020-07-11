import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";
import CustomAlert from "../../_components/common/CustomAlert";
import { debounce, IconButton, Divider } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import { validateService } from "../../_services/validate.service";
import { billService } from "../../_services/bill.service";
import Chip from "@material-ui/core/Chip";
import { useLocation } from "react-router-dom";
import "./bill.css";
import tableIcons from "../../_utils/tableIcon";
import SearchWithDate from "../../_components/common/SearchWithDate";
import { dateActions } from "../../_actions/date.actions";
import CustomizedDialogs from "./modal";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
const columnOrder = [
  { column: "ID", row: "product_id", type: "text" },
  { column: "Name", row: "product_name", type: "text" },
  { column: "Unit", row: "unit", type: "text" },
  { column: "Price", row: "price", type: "dotNumber" },
  { column: "Quantities", row: "quantities", type: "text" },
];
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
    field: "sell_item",
    type: "numeric",
    width: "10%",
    render: (rowData) => <div>{rowData.sell_items.length}</div>,
  },
];
function ConnectedBill(props) {
  const location = useLocation();
  const [state, setState] = React.useState({
    data: [],
    search: {},
    pageNumber: 0,
    numberRowPerPage: 5,
    recordsTotal: 0,
    expanded: false,
    dialogOpen: false,
    rowData: [],
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeSearch = async (e) => {
    new Promise(async (resolve, reject) => {
      let result = await billService.searchSell(0, state.numberRowPerPage, {
        purpose: e,
        description: e,
      });
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
      let result = await billService.searchSell(
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
  const collapseExpaned = () => {
    new Promise(async (resolve, reject) => {
      setState({ ...state, expanded: !state.expanded });
      resolve();
    });
  };
  const handleChangeRowPerPage = async (pageSize) => {
    props.alertClear();
    new Promise(async (resolve, reject) => {
      let result = await billService.searchSell(0, pageSize, state.search);
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
  const defaultSearch = () => {
    new Promise(async (resolve, reject) => {
      var result = await billService.searchSell(
        state.pageNumber,
        state.numberRowPerPage,
        {}
      );
      if (result.success == false) {
        props.alertError(result.message);
      }
      setState({
        ...state,
        data: result.data,
        recordsTotal: result.recordsFiltered,
        open: true,
        expanded: false,
      });
      resolve();
    });
  };
  useEffect(() => {
    props.alertClear();
    props.clearDate();
    defaultSearch();
  }, []);
  const searchSellDate = () => {
    new Promise(async (resolve, reject) => {
      var result = await billService.searchSell(0, state.numberRowPerPage, {
        start: props.dateFilter.startDate,
        end: props.dateFilter.endDate,
      });
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
  };
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
        <CustomizedDialogs
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          rowData={state.rowData.sell_items}
          rowObj={state.rowData}
          title={"Details Bill"}
          columns={columnOrder}
        />
        {location.pathname == "/bill" ? (
          <div>
            <ExpansionPanel expanded={state.expanded}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                onClick={(e) => {
                  e.preventDefault();
                  collapseExpaned();
                }}
              >
                <Typography>Advanced Searching</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SearchWithDate />
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button
                  size="small"
                  onClick={(e) => {
                    new Promise(async (resolve, reject) => {
                      e.preventDefault();
                      defaultSearch();
                      resolve();
                    });
                  }}
                >
                  Clear
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    searchSellDate();
                  }}
                >
                  Search
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
            <Divider />
          </div>
        ) : (
          <></>
        )}

        <MaterialTable
          title="Bill View"
          columns={column}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  let msgRemove = await billService.deleteSell(oldData.id);
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
              paddingLeft: 16,
            },
          }}
          actions={[
            {
              icon: tableIcons.View,
              tooltip: "Details",
              onClick: (event, rowData) => {
                // console.log(rowData.sell_items);
                new Promise(async (resolve, reject) => {
                  // console.log(rowData);
                  setState({ ...state, rowData: rowData });
                  resolve();
                  handleClickOpen();
                });
              },
              // rowData.sell_items.map((value) => {}),
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
  const { alert, dateFilter } = state;
  return {
    alert,
    dateFilter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    alertSuccess: (message) => dispatch(alertActions.success(message)),
    alertError: (message) => dispatch(alertActions.error(message)),
    alertClear: () => dispatch(alertActions.clear()),
    clearDate: () => dispatch(dateActions.clearDate()),
  };
};
const Bill = connect(mapStateToProps, mapDispatchToProps)(ConnectedBill);
export { Bill };
