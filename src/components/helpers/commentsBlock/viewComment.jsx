import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import InfoNotFound from "../notFoundBlocks/infoNotFound";
//-------------

class ViewComments extends Component {
  render() {
    // console.log("VIEW_COMMENTS_BLOCK_PROPS", this.props);
    let { allComments, typeComment, valueId } = this.props;

    let comments =
      typeComment === "project"
        ? allComments.projects_comments
        : typeComment === "issue"
        ? allComments.issues_comments
        : [];
    comments = comments.filter(val => val.id === valueId);

    return (
      <div>
        {comments && comments.length > 0 ? (
          comments.map(comment => {
            return (
              <div key={`${comment.type}№${comment.id}_comment`}>
                <div>
                  <b>{comment.user.firstname}</b>
                  <b>{comment.user.lastname}</b>
                </div>
                <div>
                  <p>{comment.comment}</p>
                </div>
              </div>
            );
          })
        ) : (
          <InfoNotFound text="comments list empty" />
        )}
      </div>
    );
  }
}

export default connect(state => ({
  allComments: state.comments
}))(withRouter(ViewComments));
