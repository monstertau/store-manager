import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  title: { fontWeight: "bold" },
  value: {
    textAlign: "right",
    fontWeight: "bold",
    padding: " 1rem 0",
  },
  des: {
    paddingTop: "1rem",
    fontSize: "15px",
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title className={classes.title}>{props.title}</Title>
      <Divider />
      <Typography component="p" variant="h5" className={classes.value}>
        {props.value} VND
      </Typography>
      {/* <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography> */}
      <div>
        <Typography className={classes.des}>{props.des}</Typography>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </React.Fragment>
  );
}
Deposits.prototype = {
  title: PropTypes.string,
  value: PropTypes.number,
  des: PropTypes.string,
};
