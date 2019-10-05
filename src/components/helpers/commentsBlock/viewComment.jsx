import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import { Icon } from "semantic-ui-react";
//-------------
import InfoNotFound from "../notFoundBlocks/infoNotFound";
//-------------
import moment from "moment";
//-------------

class ViewComments extends Component {
  render() {
    let { allComments, typeComment, valueId } = this.props;

    let comments =
      typeComment === "project"
        ? allComments.projects_comments
        : typeComment === "issue"
        ? allComments.issues_comments
        : [];
    comments = comments.filter(val => val.id === valueId);

    return (
      <div className="viewCommentBlock">
        {comments && comments.length > 0 ? (
          comments.map(comment => {
            return (
              <div key={`${comment.type}№${comment.id}_comment`} className="viewCommentBlockSomeComment">
                <div className="viewCommentBlockSomeCommentUser">
                  <Icon name="bug" color="green" />
                  <div>
                    <b>{comment.user.firstname}</b>
                    <b>{comment.user.lastname}</b>
                  </div>
                  <div className='commentDataCreate'>
                    ({moment(comment.dataCreate).format("YYYY-MM-DD HH:MM")})
                  </div>
                </div>

                <div className="viewCommentBlockSomeCommentText">
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
