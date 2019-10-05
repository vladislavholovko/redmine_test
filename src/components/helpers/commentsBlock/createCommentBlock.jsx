import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import * as CommentActions from "../../../actions/comments";
//-------------
import { toast } from "react-toastify";
import {
  Button,
  Form,
  TextArea
} from "semantic-ui-react";
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
        lastname: userInfo.lastname
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
    // console.log("CREATE_COMMENTS_BLOCK_STATE", this.state);

    return (
      <div>
        <Form loading={loading}>
          <Form.Field>
            <label>Comment</label>
            <TextArea
              fluid="true"
              placeholder="Comment"
              rows={5}
              value={comment}
              onChange={(e, data) => this.onChangeComment(data.value)}
            />
          </Form.Field>

          <Button
            children="Send"
            primary
            fluid
            size="large"
            onClick={() => this.onCreateComment()}
            type="submit"
          />
        </Form>
      </div>
    );
  }
}

export default connect(state => ({
  userInfo: state.user
}))(withRouter(CreateCommentBlock));
