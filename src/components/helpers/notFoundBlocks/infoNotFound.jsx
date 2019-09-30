import React, { Component } from "react";
//-------------
import { Icon } from "semantic-ui-react";
import "./notFoundStyle.css";
//-------------

class InfoNotFound extends Component {
  render() {
    let { text } = this.props;
    return (
      <div className="infoNotFoundBlock">
        <Icon size="big" name="info circle" />
        <p>{text.toUpperCase()}</p>
      </div>
    );
  }
}

export default InfoNotFound;
