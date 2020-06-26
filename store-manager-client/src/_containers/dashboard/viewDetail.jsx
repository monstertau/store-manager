import React, { useEffect } from "react";
import { Card, Divider, Typography } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((themes) => ({
  controlBar: {
    padding: "15px",
    "&:hover": {
      backgroundColor: "#eee",
      cursor: "pointer",
    },
  },
  CardHeader: {
    fontSize: "1.5rem",
  },
}));
const menu = [
  {
    title: "Employee",
    path: "/employee",
  },
  { title: "Inventory", path: "/inventory" },
  {
    title: "Supplier",
    path: "/supplier",
  },
  {
    title: "Invoice",
    path: "/invoice",
  },
  {
    title: "Customer",
    path: "/customers",
  },
  {
    title: "Import Product",
    path: "/importproduct",
  },
];
function RedirectDash(props) {
  const classes = useStyles();
  const handleChangePage = (path) => {
    props.history.push(path);
    // console.log(path);
  };
  return (
    <div>
      <Card
        style={{
          margin: "10px 20px 0 20px",
          border: "1px solid #eee !important",
        }}
      >
        <CardHeader
          title="View More Detail"
          className={classes.CardHeader}
        ></CardHeader>
        <Divider></Divider>
        <CardContent className={classes.CardContent}>
          {menu.map((e, index) => (
            <div
              key={index}
              onClick={(event) => {
                // console.log("e");
                event.preventDefault();
                handleChangePage(e.path);
              }}
            >
              <Grid container className={classes.controlBar}>
                <div style={{ fontSize: "16px" }}>{e.title.toUpperCase()}</div>
              </Grid>
              <Divider></Divider>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default withRouter(RedirectDash);
