import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import { userActions } from "../../_actions/user.actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import { alertActions } from "../../_actions/alert.actions";
import { CircularProgress } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PasswordField from "../../_components/common/PasswordField";
import { userService } from "../../_services";
const useStyles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  dialog: {
    margin: theme.spacing(3),
  },

  buttonStyle: {
    // marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(3),
  },
  control: {
    padding: theme.spacing(2),
  },
  close: {
    padding: theme.spacing(0.5),
  },
});
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}
class userProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      userInfo: {
        id: -1,
        name: "",
        username: "",
        email: "",
        address: "",
        mobileNo: "",
        salary: 0,
        oldPassword: "",
        newPassword: ""
      },
    };
  }
  componentDidMount() {
    this.props.alertClear();
    setTimeout(() => {
      this.props.getUserInfo();
    }, 1000);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.userProfile) {
      if (state.userInfo.id !== props.userProfile.id) {
        return {
          userInfo: props.userProfile,
        };
      }
    }
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.alertClear();
  };
  handleChange = (name) => ({ target: { value } }) => {
    if (name === "salary") {
      value = parseInt(value);
    }
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [name]: value,
      },
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    new Promise(async (resolve, reject) => {
      const updateUserInfo = this.state.userInfo;
      delete updateUserInfo.id;
      delete updateUserInfo.success;
      await this.props.updateUserInfo(updateUserInfo);
      resolve();
      setTimeout(() => {
        this.props.getUserInfo();
      }, 3000);
    });
    // this.props.getUserInfo();
  };
  handleClickOpenDialog = () => {
    this.setState({
      openDialog: true,
    });
  };
  handleCloseDialog = () => {
    this.setState({
      openDialog: false,
    });
  };
  handleChangePassword = () => {
    let oldPassword = this.state.userInfo.oldPassword;
    let newPassword = this.state.userInfo.newPassword;
    console.log(oldPassword)
    console.log(newPassword)
    userService.changePassword(oldPassword, newPassword);
  };
  render() {
    const {
      classes,
      loadedProfile,
      userProfile,
      alert,
      loadingButton,
      loadingProfile
    } = this.props;
    // console.log(this.state);
    return (
      <main className={classes.layout}>
        {alert.message && (
          <Snackbar
            open={alert.alertPopUp}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            TransitionComponent={TransitionDown}
            onClose={this.handleClose}
            message="hehe"
          >
            <MuiAlert
              severity={`${alert.type}`}
              elevation={6}
              variant="filled"
              onClose={this.handleClose}
            >
              {alert.message}
            </MuiAlert>
          </Snackbar>
        )}
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            User Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {loadedProfile ? (
                <TextField
                  required
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  fullWidth
                  variant="outlined"
                  defaultValue={userProfile && userProfile.name && `${userProfile.name}`}
                  onChange={this.handleChange("name")}
                />
              ) : (
                <Skeleton animation="wave" height={100} />
              )}
            </Grid>

            <Grid item xs={12}>
              {loadedProfile ? (
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  defaultValue={userProfile.email && `${userProfile.email}`}
                  onChange={this.handleChange("email")}
                />
              ) : (
                <Skeleton animation="wave" height={50} />
              )}
            </Grid>
            <Grid item xs={12}>
              {loadedProfile ? (
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  variant="outlined"
                  defaultValue={userProfile.address && `${userProfile.address}`}
                  onChange={this.handleChange("address")}
                />
              ) : (
                <Skeleton animation="wave" height={50} />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loadedProfile ? (
                <TextField
                  required
                  id="mobileNo"
                  name="mobileNo"
                  label="Mobile Number"
                  fullWidth
                  variant="outlined"
                  defaultValue={
                    userProfile.mobileNo && `${userProfile.mobileNo}`
                  }
                  onChange={this.handleChange("mobileNo")}
                />
              ) : (
                <Skeleton animation="wave" height={50} />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loadedProfile ? (
                <TextField
                  id="salary"
                  name="salary"
                  label="Salary"
                  fullWidth
                  variant="outlined"
                  type="number"
                  defaultValue={userProfile.salary && `${userProfile.salary}`}
                  onChange={this.handleChange("salary")}
                />
              ) : (
                <Skeleton animation="wave" height={50} />
              )}
            </Grid>
            <Grid item xs={12}>
              {loadedProfile ? (
                <TextField
                  required
                  id="role"
                  name="role"
                  label="Role"
                  fullWidth
                  variant="outlined"
                />
              ) : (
                <Skeleton animation="wave" height={50} />
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.buttonStyle}
                onClick={this.handleSubmit}
                // startIcon={}
              >
                {loadedProfile ? (
                  <>
                    <UpdateIcon /> Update Profile
                  </>
                ) : (
                  <CircularProgress color="secondary" />
                )}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.buttonStyle}
                onClick={this.handleClickOpenDialog}
              >
                {loadedProfile ? (
                  <>
                    <VpnKeyIcon /> Change password
                  </>
                ) : (
                  <CircularProgress color="primary" />
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Input the password you want to change.
            </DialogContentText>
            <Grid>
              <PasswordField
                label="Old Password"
                variant="outlined"
                onChange={this.handleChange("oldPassword")}
                fullWidth
              />
              <PasswordField
                label="New Password"
                variant="outlined"
                onChange={this.handleChange("newPassword")}
                fullWidth
              />
              <PasswordField
                label="Confirm Password"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseDialog}
              color="secondary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleChangePassword}
              color="primary"
              variant="outlined"
            >
              Change
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    loadingProfile,
    loadedProfile,
    userProfile,
    loadingButton,
  } = state.userInfomation;
  const { alert } = state;
  return {
    loadingProfile,
    loadedProfile,
    alert,
    userProfile,
    loadingButton,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(userActions.getUserInfo()),
    updateUserInfo: (userInfo) =>
      dispatch(userActions.updateUserInfo(userInfo)),
    alertClear: () => dispatch(alertActions.clear()),
  };
};
const userProfileStyles = withStyles(useStyles)(userProfile);
const connectedUserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(userProfileStyles);
export { connectedUserProfile as userProfile };
