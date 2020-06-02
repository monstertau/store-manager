import React from 'react'
import PropTypes from 'prop-types'
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}
export default function CustomAlert(props) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.autoHideDuration}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      TransitionComponent={TransitionDown}
      onClose={props.onClose}
      message="hehe"
    >
      <MuiAlert
        severity={`${props.type}`}
        elevation={6}
        variant="filled"
        onClose={props.onClose}
      >
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
}
CustomAlert.propTypes = {
  open: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  type: PropTypes.string,
  onClose: PropTypes.func,
  message: PropTypes.string,
};
