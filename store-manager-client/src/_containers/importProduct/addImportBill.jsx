import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, TablePagination } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";

import {
  Dialog,
  DialogContentText,
  DialogContent,
  Divider,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { customerActions } from "../../_actions/customer.actions";
import tableIcons from "../../_utils/tableIcon";
import { AddImportItem } from "./addImportItem";
import { connect } from "react-redux";
import { useEffect } from "react";
import { billService } from "../../_services/bill.service";
import { buyService } from "../../_services/buy.service";

const useStyles = makeStyles((theme) => ({
  dialog: {
    margin: theme.spacing(3),
  },
  tableTitle: {
    backgroundColor: "#eee",
  },
}));
function ConnectedAddImportBill(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Product Name",
        field: "product_name",
        editable: "never",
        width: "30%",
        cellStyle: { whiteSpace: "nowrap" },
        filterCellStyle: { display: "hidden" },
      },
      {
        title: "Price",
        field: "price",
        width: "10%",

        required: true,
      },
      {
        title: "Quantity",
        field: "quantity",
        width: "8%",
      },
      {
        title: "Unit",
        field: "unit",
        width: "10%",
      },
      {
        title: "Total",
        field: "total",
        type: "numeric",
        width: "15%",
      },
      {
        width: "30%",
        title: "Supplier",
        field: "supplier_name",
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
    importBill: [],
    search: "",
    pageNumber: 0,
    numberRowPerPage: 5,
    recordsTotal: 0,
    dialogOpen: false,
  });
  const handleChange = (prop) => (event) => {
    setState({
      ...state,
      [prop]: event.target.value,
    });
  };
  const handleSubmit = () => {
    const data = {
      buy_items: state.importBill,
    };
    buyService.createNewBuy(data).then((res) => {
      if (res.success === true) {
        console.log("TRUE");
      }
    });
    window.location.reload();
    props.onClose();
  };
  useEffect(() => {
    if (props.importItem.importItem) {
      const buy_item = {
        product_id: props.importItem.importItem.product_id,
        supplier_id: props.importItem.importItem.supplier_id,
        price: props.importItem.importItem.price,
        quantities: props.importItem.importItem.quantity,
      };
      const importBill = state.importBill.slice();
      const data = state.data.slice();
      const importItem = props.importItem.importItem;
      importItem.total = importItem.quantity * importItem.price;
      data.push(importItem);
      importBill.push(buy_item);

      setState({
        ...state,
        data: data,
        importBill: importBill,
      });
    }
  }, [props.importItem]);
  useEffect(() => {
    setState({
      ...state,
      data: [],
      importBill: [],
    });
  }, []);
  const handleAddImportItemClose = () => {
    setState({
      ...state,
      dialogOpen: false,
    });
  };
  console.log(state);
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="add-supplier-dialog-title"
        className={classes.dialog}
        maxWidth={props.maxWidth}
        fullWidth={true}
      >
        <DialogTitle id="add-supplier-dialog-title">
          <Typography style={{ fontSize: "30px" }} align="center">
            Add Import Bill
          </Typography>
        </DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          {/* <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow className={classes.tableTitle}>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Supplier</TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer> */}
          <AddImportItem
            open={state.dialogOpen}
            onClose={handleAddImportItemClose}
            maxWidth="sm"
            onSubmit={handleAddImportItemClose}
          />
          <MaterialTable
            title="Products"
            columns={state.columns}
            data={state.data}
            icons={tableIcons}
            options={{
              search: true,
              actionsColumnIndex: -1,
              pageSizeOptions: [5, 10],
              headerStyle: {
                backgroundColor: "#EEE",
                fontSize: "16px",
              },
              // filtering: true,
              // tableLayout: "auto",
              emptyRowsWhenPaging: true,
            }}
            actions={[
              {
                icon: tableIcons.Add,
                tooltip: "Add Import Item",
                position: "toolbar",
                onClick: (event, rowData) => {
                  setState({
                    ...state,
                    dialogOpen: true,
                  });
                },
              },
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { importItem } = state;
  return {
    importItem,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
const AddImportBill = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAddImportBill);
AddImportBill.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  maxWidth: PropTypes.string,
};
export { AddImportBill };
