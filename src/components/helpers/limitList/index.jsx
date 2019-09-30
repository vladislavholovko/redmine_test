import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import { Button } from "semantic-ui-react";
//-------------
import * as LimitActions from "../../../actions/limitListAction/index";
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
      <div>
        <Button primary={limit === 10} onClick={() => this.onChangeLimit(10)}>
          10
        </Button>
        <Button primary={limit === 25} onClick={() => this.onChangeLimit(25)}>
          25
        </Button>
        <Button primary={limit === 50} onClick={() => this.onChangeLimit(50)}>
          50
        </Button>
        <Button primary={limit === 100} onClick={() => this.onChangeLimit(100)}>
          100
        </Button>
      </div>
    );
  }
}

export default connect(state => ({
  limit: state.limit.limit
}))(withRouter(LimitList));
