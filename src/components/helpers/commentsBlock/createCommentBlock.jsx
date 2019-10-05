import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import * as CommentActions from "../../../actions/comments";
//-------------
import { toast } from "react-toastify";
import { Form, Icon, Input } from "semantic-ui-react";
//-------------

class CreateCommentBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      comment: ""
    };
  }

  onCreateComment = async () => {
    try {
      let { comment } = this.state;
      let { userInfo, typeComment, valueId } = this.props;
      let user = {
        id: userInfo.id,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
      };

      this.setState({ loading: true });
      if (!comment) {
        throw new Error("Comment empty");
      }

      await CommentActions.createComment(typeComment, valueId, comment, user);

      this.setState({ loading: false, comment: "" });
    } catch (error) {
      this.setState({ loading: false });
      toast.error(error.message);
    }
  };

  onChangeComment = text => {
    this.setState({ comment: text });
  };

  render() {
    let { loading, comment } = this.state;

    return (
      <div>
        <Form loading={loading} onSubmit={() => this.onCreateComment()}>
          <Form.Field>
            <Input
              icon
              placeholder="Create comment"
              value={comment}
              onChange={e => this.onChangeComment(e.target.value)}
            >
              <input />
              <Icon
                name="chevron circle right"
                size="large"
                link
                onClick={() => {
                  this.onCreateComment();
                }}
              />
            </Input>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default connect(state => ({
  userInfo: state.user
}))(withRouter(CreateCommentBlock));
