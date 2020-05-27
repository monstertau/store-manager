import React from "react";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class CustomDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorText: "a", value: props.value };
  }
  onChange(event) {
    if (event.target.value.match("abc")) {
      this.setState({ errorText: "" });
    } else {
      this.setState({ errorText: "Invalid format: ###-###-####" });
    }
  }
  render() {
    return (
      <div>
        <TextField
          style={{ width: "100%", margin: "15px 0" }}
          id="filled-password-input"
          label="Password"
          type="password"
          helperText={this.state.errorText}
        />
        <br />
        <TextField
          style={{ width: "100%", margin: "15px 0" }}
          id="filled-error-helper-text"
          label="Confirm Password"
          error
          helperText={this.state.errorText}
        />
      </div>
    );
  }
}
export default CustomDialog;
