import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect } from "react-router-dom";

const useStyles = (theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    margin: "3rem auto 0 auto",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
});
const handleDashboard = () => {
  return <Redirect to={{ pathname: "/login" }} />;
//   console.log(this.context.router.push("/path"));
};
class HomePage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.heroContent}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Welcome
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDashboard}
                >
                  Go to Cashier UI
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Go to Dashboard
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}
const HomePageCom = withStyles(useStyles)(HomePage);
export default HomePageCom;
