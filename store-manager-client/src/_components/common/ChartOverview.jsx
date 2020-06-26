import React from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter, useHistory } from "react-router-dom";
import Chart from "../layout/chart";
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { Grid, Divider } from "@material-ui/core";
import SearchWithDate from "./SearchWithDate";

const styles = (theme) => ({
  CardHeader: {
    fontSize: "18px !important",
    paddingBottom: 0,
  },
  buttonRedirect: {
    fontSize: "16px",
    paddingRight: "1.1rem",
    display: "flex",
    flexDirection: "row-reverse",
    minHeight: "39px",
    maxHeight: "44px",
    margin: "auto 0",
  },
  canvas: {
    maxWidth: "100% !important",
    padding: "10px",
  },
  dividerStyle: {
    marginBottom: "10px",
  },
  paddingZero: {
    padding: 0,
  },
  controlBar: {
    borderBottom: "1px solid #e1e5eb!important",
    padding: "7px 0",
    backgroundColor: "#fbfbfb!important",
  },
  buttonGroup: {
    padding: "2rem",
  },
});
class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top",
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3,
          },
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % 7 !== 0 ? "" : tick;
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                },
              },
            },
          ],
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false,
        },
      },
      ...this.props.chartOptions,
    };

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.props.chartData,
      options: chartOptions,
    });

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.props.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    BlogUsersOverview.render();
  }
  handleChange(page) {
    this.props.history.push(page);
  }
  render() {
    const { title, classes } = this.props;
    return (
      <Card className={classes.paddingZero}>
        <CardHeader title={title} className={classes.CardHeader} />
        <Divider />
        <CardContent className={classes.paddingZero}>
          <Grid container className={classes.controlBar}>
            <Grid item xs={8}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
                style={{ paddingLeft: "1rem" }}
              >
                <Button>Day</Button>
                <Button>Month</Button>
                <Button>Year</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={4} className={classes.buttonRedirect}>
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleChange("/report");
                }}
              >
                View Full Report <span>&rarr;</span>
              </Button>
            </Grid>
          </Grid>
          <canvas
            height="120"
            ref={this.canvasRef}
            className={classes.canvas}
          />
        </CardContent>
      </Card>
    );
  }
}

UsersOverview.defaultProps = {
  title: "Users Overview",
  chartData: {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "Current Month",
        fill: "start",
        data: [
          500,
          800,
          320,
          180,
          240,
          320,
          230,
          650,
          590,
          1200,
          750,
          940,
          1420,
          1200,
          960,
          1450,
          1820,
          2800,
          2102,
          1920,
          3920,
          3202,
          3140,
          2800,
          3200,
          3200,
          3400,
          2910,
          3100,
          4250,
        ],
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3,
      },
      {
        label: "Past Month",
        fill: "start",
        data: [
          380,
          430,
          120,
          230,
          410,
          740,
          472,
          219,
          391,
          229,
          400,
          203,
          301,
          380,
          291,
          620,
          700,
          300,
          630,
          402,
          320,
          380,
          289,
          410,
          300,
          530,
          630,
          720,
          780,
          1200,
        ],
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgba(255,65,105,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgba(255,65,105,1)",
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: "rgba(255,65,105,1)",
      },
    ],
  },
};

const UsersOverviewRouter = withRouter(UsersOverview);
export default withStyles(styles)(UsersOverviewRouter);
