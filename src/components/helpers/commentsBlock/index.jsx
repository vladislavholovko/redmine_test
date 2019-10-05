import React, { Component } from "react";
import { withRouter } from "react-router";
//-------------
import './commentBlock.css'
//-------------
import CreateCommentBlock from "./createCommentBlock";
import ViewComments from "./viewComment";
//-------------

class CommentsBlock extends Component {
  render() {
    let { typeComment, valueId } = this.props;

    return (
      <div className="commentBlockWrapper">
        <ViewComments typeComment={typeComment} valueId={valueId} />
        <CreateCommentBlock typeComment={typeComment} valueId={valueId} />
      </div>
    );
  }
}

export default withRouter(CommentsBlock);
