import React from "react";
export default class TransactionDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString(),
    };
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ date: new Date().toLocaleString() }),
      1000
    );
  }
  render() {
    return <React.Fragment>{this.state.date}</React.Fragment>;
  }
}
