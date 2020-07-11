import React from "react";
import Container from "@material-ui/core/Container";
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
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
const contactList = [
  {
    icon: MailIcon,
    title: "EMAIl",
    detail: "nxhoang99@gmail.com",
  },
  {
    icon: PhoneIphoneIcon,
    title: "PHONE",
    detail: "+84(0)378007721",
  },
  {
    icon: TwitterIcon,
    title: "TWITTER",
    detail: "twitter@.com",
  },
  {
    icon: FacebookIcon,
    title: "FACEBOOK",
    detail: "Nguyễn Xuân Hoàng",
  },
];

const useStyles = (theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    margin: "3rem auto 0 auto",
  },
  circle: {
    // minHeight: "11rem",
    border: "1px solid #c7c5c5",
    borderRadius: "50%",
    backgroundColor: "white",
    width: "80%",
    margin: "0 auto",
    "&:hover": {
      backgroundColor: "#c7c5c5",
    },
  },
  title: {
    color: "#ee6557",
    marginTop: "1rem",
  },
  icon: {
    fontSize: "9rem",
    display: "block",
    margin: "auto",
    padding: "3rem",
    color: "#c7c5c5",
    "&:hover": {
      color: "white",
    },
  },
  detail: {
    borderBottom: "1px solid #16a6b6",
    display: "table",
    margin: "0 auto",
  },
});

class ContactCon extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h2"
            variant="h1"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Contact Us
          </Typography>
          <Typography align="center">
            Get in touch with us to get news
          </Typography>
        </Container>
        <Container maxWidth="md" style={{ marginTop: "3rem" }}>
          <Grid container spacing={3}>
            {contactList.map((e, key) => (
              <Grid item xs={3} key={key}>
                <div className={classes.outer}>
                  <div className={classes.circle}>
                    <e.icon className={classes.icon} />
                  </div>
                  <div>
                    <Typography align="center" className={classes.title}>
                      {e.title}
                    </Typography>
                    <span align="center" className={classes.detail}>
                      {e.detail}
                    </span>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}
const Contact = withStyles(useStyles)(ContactCon);
export default Contact;
