import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { userService } from "../../_services";
import { connect } from "react-redux";
import { userActions } from "../../_actions/user.actions";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignInSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleUserNameChange.bind(this);
    this.handlePasswordChange.bind(this);
    this.handleSubmitChange.bind(this);
  }
  handleUserNameChange = (e) => {
    e.preventDefault();
    this.setState({
      username: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    e.preventDefault();
    this.setState({
      password: e.target.value,
    });
  };
  handleSubmitChange = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.props.login(username, password);
    // this.props.dispatch(userActions.login(username,password))
    // userService.login(this.state.username, this.state.password);
    console.log(process.env.REACT_APP_SERVER_URL);
  };
  render() {
    const { classes, location, alert, loggingIn } = this.props;
    if (window.localStorage.getItem("user") !== null) {
      // neu da login thi Redirect
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: location,
            },
          }}
        />
      );
    }

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* <form className={classes.form} noValidate> */}
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleUserNameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handlePasswordChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmitChange}
                disable={`${loggingIn}`}
              >
                
                {loggingIn ? <CircularProgress color="secondary"/> : "Sign In"}
              </Button>
              {alert.message && (
                <Alert severity={`${alert.type}`}>{alert.message}</Alert>
              )}

              <Box mt={5}>
                <Copyright />
              </Box>
            </Grid>
            {/* </form> */}
          </div>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { loggingIn, loggedIn } = state.authentication;
  const { alert } = state;
  return {
    loggingIn,
    loggedIn,
    alert,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) =>
      dispatch(userActions.login(username, password)),
  };
};
const Login = withStyles(useStyles)(SignInSide);
const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export { connectedLogin as Login };
