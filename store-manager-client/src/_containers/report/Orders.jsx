import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import { numberWithCommas } from "../../_utils";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  tableTitle: {
    backgroundColor: "#eee",
  },
  boldText: {
    fontWeight: "bold",
  },
  heightTable: {
    height: "35px",
    // color: "red",
  },
}));

export default function Orders(props) {
  var rows = [];
  props.products.map((e) => {
    console.log(e)
    rows.push(e);
  });
  
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableTitle}>
            {props.data.map((columns, index) => (
              <TableCell className={classes.boldText} key={index}>
                {columns.column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          // style={{ height: "00px", overflow: "auto" }}
          className="scroll"
        >
          {rows.map((row, index) => (
            <TableRow key={index} className={classes.heightTable} hover={true}>
              {props.data.map((e, index) => {
                // console.log(e);
                return e.type == "dotNumber" ? (
                  <TableCell
                    style={{ padding: "15px 24px 6px 16px" }}
                    key={index}
                  >
                    {numberWithCommas(row[e.row])}
                  </TableCell>
                ) : (
                  <TableCell
                    style={{ padding: "15px 24px 6px 16px" }}
                    key={index}
                  >
                    {row[e.row]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
}

Orders.prototype = {
  products: PropTypes.array,
  data: PropTypes.array,
};
