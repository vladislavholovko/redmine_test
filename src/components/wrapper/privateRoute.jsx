import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, Route } from "react-router-dom";
//-------------

class PrivateRoute extends Component {
  render() {
    let { userInfo } = this.props;

    return (
      <Fragment>
        {userInfo.api_key ? (
          <Route {...this.props} />
        ) : (
          <Redirect to="/signIn" />
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  userInfo: state.user
}))(withRouter(PrivateRoute));
