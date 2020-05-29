import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import { userActions } from "../../_actions/user.actions";
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
  buttonStyle: {
    marginBottom: theme.spacing(3),
  },
  control: {
    padding: theme.spacing(2),
  },
});
class userProfile extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.getUserInfo();
    }, 1000);
  }
  render() {
    const { classes, loadedProfile, userProfile,alert } = this.props;
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {alert.message && (
            <Alert severity={`${alert.type}`}>{alert.message}</Alert>
          )}
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
                  defaultValue={userProfile.name && `${userProfile.name}`}
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
                />
              ) : (
                <Skeleton animation="wave" height={50} />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
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
              {loadedProfile ? (
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                />
              ) : (
                <Skeleton animation="wave" height={50} />
              )}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonStyle}
            >
              Update Profile
            </Button>
          </Grid>
        </Paper>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  const { loadingProfile, loadedProfile, userProfile } = state.userInfomation;
  const { alert } = state;
  return {
    loadingProfile,
    loadedProfile,
    alert,
    userProfile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(userActions.getUserInfo()),
  };
};
const userProfileStyles = withStyles(useStyles)(userProfile);
const connectedUserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(userProfileStyles);
export { connectedUserProfile as userProfile };
