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
          disabled={page === 1}
          onClick={() => onChangePage("page", page - 1, false)}
          icon="angle left"
        />
        {page - 1 > 0 ? (
          <Button onClick={() => onChangePage("page", page - 1, false)}>{page - 1}</Button>
        ) : null}
        <Button primary>{page}</Button>
        {page + 1 <= totalPages ? (
          <Button onClick={() => onChangePage("page", page + 1, false)}>{page + 1}</Button>
        ) : null}
        <Button
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
