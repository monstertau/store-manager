import React from "react";
import { userActions } from "../../_actions/user.actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class LogOut extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.logout());
  }
  render() {
    const { location } = this.props;
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: location,
          },
        }}
      >
        Redirect To Login
      </Redirect>
    );
  }
}
const mapStateToProps = (state) => ({});
const connectedLogOut = connect(mapStateToProps)(LogOut);
export { connectedLogOut as LogOut };
