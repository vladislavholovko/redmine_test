import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import * as LimitActions from "../../../../actions/limitListAction";
//-------------
import { Label } from "semantic-ui-react";
import './limitList.css'
//-------------

class LimitList extends Component {
  onChangeLimit = async limit => {
    let { onChange } = this.props;

    await LimitActions.setLimit(limit);
    await onChange(true);
  };

  render() {
    let { limit } = this.props;

    return (
      <div className="limitListBlock">
        <Label
          circular
          color={limit === 5 ? "blue" : "grey"}
          onClick={() => this.onChangeLimit(5)}
        >
          5
        </Label>
        <Label
          circular
          color={limit === 10 ? "blue" : "grey"}
          onClick={() => this.onChangeLimit(10)}
        >
          10
        </Label>
        <Label
          circular
          color={limit === 15 ? "blue" : "grey"}
          onClick={() => this.onChangeLimit(15)}
        >
          15
        </Label>
      </div>
    );
  }
}

export default connect(state => ({
  limit: state.limit.limit
}))(withRouter(LimitList));
