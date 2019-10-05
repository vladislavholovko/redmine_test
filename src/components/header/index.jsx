import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
//-------------
import * as userInfoActions from "../../actions/userActions";
//-------------
import { Menu, Icon } from "semantic-ui-react";
import './header.css'
//-------------

class HeaderBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ""
    };
  }

  handleItemClick = (e, { name }) => {
    this.props.history.push(`/${name}`);
  };

  logOut = async () => {
    await userInfoActions.signOut();
    this.props.history.push("/signIn");
  };

  render() {
    let { userInfo } = this.props;
    let activeItem = this.props.location.pathname.substring(1);

    return (
      <div>
        <Menu>
          <Menu.Item
            name="project"
            active={activeItem === "project"}
            onClick={this.handleItemClick}
          >
            Project
          </Menu.Item>
          <Menu.Item
            name="issues"
            active={activeItem === "issues"}
            onClick={this.handleItemClick}
          >
            Issues
          </Menu.Item>
          <Menu.Item
            name="time"
            active={activeItem === "time"}
            onClick={this.handleItemClick}
          >
            Spend Time
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <div>{userInfo.firstname}</div>
            </Menu.Item>
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.logOut}
            >
              <Icon name='sign-out' size="large" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default connect(state => ({
  userInfo: state.user
}))(withRouter(HeaderBlock));
