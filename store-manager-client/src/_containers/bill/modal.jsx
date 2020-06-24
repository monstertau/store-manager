import React, { useEffect } from "react";
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
import { timePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
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
  const [state, setState] = React.useState({
    totalCompute: 0,
  });
  useEffect(() => {
    if (props.rowData && !props.rowObj.total) {
      var totalcheck = 0;
      new Promise(async (resolve, reject) => {
        props.rowData.map((e) => {
          totalcheck += e.price * e.quantities;
        });
        resolve();
        setState({ ...state, totalCompute: totalcheck });
      });
    }
  }, [props.rowData]);
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
          {props.title}
          {props.rowObj.active ? (
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
                <b> Cashier: </b> {props.rowObj.user_name}
              </Typography>
              {/* <Paper className={classes.paper}>xs=12</Paper> */}
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <b> Customer: </b>
                {props.rowObj.customer_name ? (
                  props.rowObj.customer_name
                ) : (
                  <span>New Customer</span>
                )}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <b> Create At: </b> {props.rowObj.createdAt}
              </Typography>
            </Grid>
          </Grid>
          <Orders data={props.columns} products={props.rowData} />
          <Grid container spacing={3} style={{ padding: "10px 0px 0px 20px" }}>
            <Grid item xs={5}></Grid>
            <Grid item xs={7}>
              <Grid
                container
                spacing={3}
                style={{ padding: "10px 0px 0px 20px" }}
              >
                <Grid item xs={4}>
                  {props.rowObj.total ? (
                    <Typography>
                      <b> Total:</b>
                      {Math.ceil(props.rowObj.total / (1 + props.rowObj.tax))}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Grid>
                <Grid item xs={3}>
                  {props.rowObj.tax ? (
                    <Typography>
                      <b> Tax:</b> {props.rowObj.tax * 100}%
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <Typography>
                    <b>Grand Total</b>: {props.rowObj.total}
                    {state.totalCompute}
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
  rowObj: PropTypes.object,
  rowData: PropTypes.array,
};
