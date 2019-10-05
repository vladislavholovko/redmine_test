import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import { Button } from "semantic-ui-react";
import "./paginationStyle.css";
//-------------

class Pagination extends Component {
  render() {
    let { page, limit, totalCount, onChangePage } = this.props;
    let totalPages = Math.ceil(totalCount / limit);

    return (
      <div className="pagination">
        <Button
          size="mini"
          color="grey"
          disabled={page === 1}
          circular
          onClick={() => onChangePage("page", page - 1, false)}
          icon="angle left"
        />
        {page - 1 > 0 ? (
          <Button
            size="mini"
            color="grey"
            circular
            onClick={() => onChangePage("page", page - 1, false)}
          >
            {page - 1}
          </Button>
        ) : null}
        <Button circular primary size="mini">
          {page}
        </Button>
        {page + 1 <= totalPages ? (
          <Button
            size="mini"
            color="grey"
            circular
            onClick={() => onChangePage("page", page + 1, false)}
          >
            {page + 1}
          </Button>
        ) : null}
        <Button
          size="mini"
          color="grey"
          circular
          disabled={totalPages < 2 || page === totalPages}
          onClick={() => onChangePage("page", page + 1, false)}
          icon="angle right"
        />
      </div>
    );
  }
}

export default connect(state => ({
  limit: state.limit.limit
}))(withRouter(Pagination));
