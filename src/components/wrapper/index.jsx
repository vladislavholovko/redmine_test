import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
//-------------
import { toast } from "react-toastify";
import "./wrapperStyle.css";
//-------------
import { getTokenFromLocalStorage } from "../../actions/localStorage";
import * as userInfoActions from "../../actions/userActions";
//-------------
import PrivateRoute from "./privateRoute";
import PageNotFound from "../helpers/notFoundBlocks/pageNotFoind";
import LoaderBlock from "../helpers/loading/index";
import SignIn from "../signIn";
import HeaderBlock from "../header";
import ProjectsBlock from "../projects/index";
import ProjectInfo from "../projects/projectInfo";
import IssuesBlock from "../issues/index";
import IssuesInfo from "../issues/issueInfo";
import SpentTimeBlock from "../spentTime/index";
//-------------

class Wrapper extends Component {
  state = {
    initialized: false
  };

  componentDidMount = async () => {
    try {
      let key = await getTokenFromLocalStorage("api_key");
      if (!key) return;
      await userInfoActions.getUserInfo(key);
    } catch (e) {
      toast.error("User Info Errors");
    } finally {
      this.setState({ initialized: true });
    }
  };

  render() {
    const { initialized } = this.state;
    let url = this.props.location.pathname;
    if (!url || url === "/") {
      this.props.history.push("/project");
    }

    return initialized ? (
      <div className="wrapperBlock">
        {url === "/signIn" ? (
          <Route path="/signIn" component={SignIn} />
        ) : (
          <div className="authorizationBlock">
            <HeaderBlock />
            <Switch>
              <PrivateRoute exact path="/project" component={ProjectsBlock} />
              <PrivateRoute path="/project/:id" component={ProjectInfo} />
              <PrivateRoute exact path="/issues" component={IssuesBlock} />
              <PrivateRoute path="/issues/:id" component={IssuesInfo} />
              <PrivateRoute exact path="/time" component={SpentTimeBlock} />
              <PrivateRoute component={PageNotFound} />
            </Switch>
          </div>
        )}
      </div>
    ) : (
      <LoaderBlock />
    );
  }
}

export default withRouter(Wrapper);
