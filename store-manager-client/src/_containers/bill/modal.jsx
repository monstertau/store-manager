import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Orders from "../report/Orders";
import { Divider, Grid, Chip } from "@material-ui/core";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          View Details Bill
          {props.rowData.active ? (
            <Chip
              style={{ marginLeft: "1rem" }}
              label="Completed"
              color="primary"
            />
          ) : (
            <Chip
              style={{ marginLeft: "1rem" }}
              label="Discarded"
              color="secondary"
            />
          )}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} style={{ padding: "0 0px 20px 12px" }}>
            <Grid item xs={4}>
              <Typography>
                <b> Cashier: </b> {props.rowData.user_name}
              </Typography>
              {/* <Paper className={classes.paper}>xs=12</Paper> */}
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <b> Customer: </b>
                {props.rowData.customer_name ? (
                  props.rowData.customer_name
                ) : (
                  <span>New Customer</span>
                )}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <b> Create At: </b> {props.rowData.createdAt}
              </Typography>
            </Grid>
          </Grid>
          <Orders
            data={[
              { column: "ID", row: "product_id", type: "text" },
              { column: "Name", row: "product_name", type: "text" },
              { column: "Unit", row: "unit", type: "text" },
              { column: "Price", row: "price", type: "dotNumber" },
              { column: "Quantities", row: "quantities", type: "text" },
            ]}
            products={props.rowData.sell_items}
          />
          <Grid container spacing={3} style={{ padding: "10px 0px 0px 20px" }}>
            <Grid item xs={5}></Grid>
            <Grid item xs={7}>
              <Grid
                container
                spacing={3}
                style={{ padding: "10px 0px 0px 20px" }}
              >
                <Grid item xs={4}>
                  <Typography>
                    <b> Total:</b>{" "}
                    {Math.ceil(props.rowData.total / (1 + props.rowData.tax))}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>
                    <b> Tax:</b> {props.rowData.tax * 100}%
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography>
                    <b>Grand Total</b>: {props.rowData.total}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CustomizedDialogs.prototype = {
  open: PropTypes.bool,
  handleClickOpen: PropTypes.func,
  handleClose: PropTypes.func,
  rowData: PropTypes.object,
};
