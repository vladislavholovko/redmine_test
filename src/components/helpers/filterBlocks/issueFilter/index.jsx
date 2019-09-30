import React, { Component } from "react";
//-------------
import { Button, Form, Input } from "semantic-ui-react";
//-------------

class IssueFilter extends Component {
  render() {
    let { issueId, onLoad, onChangeIssue } = this.props;

    return (
      <div>
        <Form onSubmit={() => onLoad(true)}>
          <Input
            fluid
            placeholder="Issues"
            value={issueId}
            onChange={e =>
              onChangeIssue("issueId", e.target.value, false, true)
            }
          />
        </Form>
        <Button
          onClick={() => {
            onChangeIssue("issueId", null, true);
          }}
        >
          Clear
        </Button>
      </div>
    );
  }
}

export default IssueFilter;
