/* eslint-disable */
import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { inventoryService } from "../../_services/inventory.service";
import { connect } from "react-redux";
import { alertActions } from "../../_actions/alert.actions";
import CustomAlert from "../../_components/common/CustomAlert";
import { validateService } from "../../_services/validate.service";
import TablePagination from "@material-ui/core/TablePagination";
import { debounce } from "lodash";
import tableIcons from "../../_utils/tableIcon";
import { productAdderActions } from "../../_actions/productAdder.actions";

function connectedProductTable(props) {
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
        required: true,
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
          title="Products"
          columns={state.columns}
          data={state.data}
          actions={[
            {
              icon: tableIcons.AddProduct,
              tooltip: "Add to Cart",
              onClick: (event, rowData) => {
                const product = {};
                product.id = rowData.id;
                product.name = rowData.name;
                product.price = rowData.price;
                product.unit = rowData.unit;
                product.quantities = 1;
                // delete product.tableData
                // delete product.barcode;
                // console.log(product)
                props.addProduct(product);
              },
            },
          ]}
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
          onSearchChange={debounce(handleChangeSearch, 600)}
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
    addProduct: (product) => dispatch(productAdderActions.addProduct(product)),
    addedProductClear: () => dispatch(productAdderActions.addedProductClear()),
  };
};
const ProductTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(connectedProductTable);
export default ProductTable;
