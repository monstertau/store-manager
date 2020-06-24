import React from "react";
import PropTypes from "prop-types";
import Chart from "../layout/chart";
import { withStyles } from "@material-ui/styles";

import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Grid } from "@material-ui/core";

const styles = (theme) => ({
  cardClasses: {},
  cardBodyClasses: {
    padding: "0",
    paddingBottom: "0 !important",
  },
  innerWrapperClasses: {
    padding: "0 1rem",
  },
  dataFieldClasses: {
    display: "inline-block",
    margin: "auto 0",
  },
  labelClasses: {
    textAlign: "left",
    fontSize: ".625rem",
    letterSpacing: ".0625rem",
    color: "#818ea3",
    textTransform: "uppercase!important",
    margin: "10px 0 5px 0",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
  },
  valueClasses: {
    // padding: "0 1rem",
    textAlign: "left",
    fontSize: "1.4625rem",
    margin: "0",
    fontWeight: "500",
  },
  innerDataFieldClasses: {
    display: "inline-block",
    height: "100%",
    margin: "auto 0",
  },
  percentageClasses: {
    fontSize: "1rem",
    marginLeft: "auto",
    position: "relative",
    display: "table",
    marginLeft: "auto",
    paddingLeft: ".9375rem",
    verticalAlign: "bottom",
  },
  chartSmall: {
    // position: "absolute !important",
    width: "100% !important",
    // maxHeight: "67px",
  },
  iconArrow: {
    verticalAlign: "bottom",
    // marginTop:"0.1rem",
    fontSize: "1.5rem",
  },
});

class SmallStats extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
          custom: false,
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0.33,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: false,
              scaleLabel: false,
              ticks: {
                display: false,
                isplay: false,
                // Avoid getting the graph line cut of at the top of the canvas.
                // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                suggestedMax: Math.max(...this.props.chartData[0].data) + 1,
              },
            },
          ],
        },
      },
      ...this.props.chartOptions,
    };

    const chartConfig = {
      ...{
        type: "line",
        data: {
          ...{
            labels: this.props.chartLabels,
          },
          ...{
            datasets: this.props.chartData,
          },
        },
        options: chartOptions,
      },
      ...this.props.chartConfig,
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const {
      variation,
      label,
      value,
      percentage,
      increase,
      classes,
    } = this.props;

    const canvasHeight = variation === "1" ? 110 : 50;

    return (
      <Card className={classes.cardClasses} style={{ margin: "20px" }}>
        <CardContent className={classes.cardBodyClasses}>
          <Grid container className={classes.innerWrapperClasses}>
            <Grid item xs={6} className={classes.dataFieldClasses}>
              <div className={classes.labelClasses}>{label}</div>
              <h6 className={classes.valueClasses}>{value}</h6>
            </Grid>
            <Grid item xs={6} className={classes.innerDataFieldClasses}>
              <span
                className={classes.percentageClasses}
                style={increase ? { color: "#17c671" } : { color: "#c4183c" }}
              >
                {increase ? (
                  <ArrowDropUpIcon
                    className={classes.iconArrow}
                    style={{ color: "#17c671" }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    className={classes.iconArrow}
                    style={{ color: "#c4183c" }}
                  />
                )}
                {percentage}
              </span>
            </Grid>
          </Grid>
          <canvas
            height={57}
            width={290}
            ref={this.canvasRef}
            className={classes.chartSmall}
          />
        </CardContent>
      </Card>
    );
  }
}

SmallStats.propTypes = {
  /**
   * The Small Stats variation.
   */
  variation: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The percentage number or string.
   */
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Whether is a value increase, or not.
   */
  increase: PropTypes.bool,
  /**
   * The Chart.js configuration object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options object.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.array.isRequired,
  /**
   * The chart labels.
   */
  chartLabels: PropTypes.array,
};

SmallStats.defaultProps = {
  increase: true,
  percentage: 0,
  value: 0,
  label: "Label",
  chartOptions: Object.create(null),
  chartConfig: Object.create(null),
  chartData: [],
  chartLabels: [],
};
// export default SmallStats;
export default withStyles(styles)(SmallStats);
