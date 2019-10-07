import React, { Component } from "react";
import { withRouter } from "react-router";
//-------------
import "./projects.css";
import moment from "moment";
//-------------

class ProjectInfoIssueList extends Component {
  render() {
    let { ListIssues, projectId, onRedirectToIssueInfo } = this.props;
    return (
      <div className="projectInfoAboutSomeIssueWrapper">
        {ListIssues.map(issue => (
          <div
            className="projectInfoAboutSomeIssueBlock"
            key={`project=${projectId}_issue_id:${issue.id}`}
          >
            <div
              onClick={() => onRedirectToIssueInfo(issue.id)}
              className="projectInfoAboutSomeIssueBlockId"
            >
              Issue №: {issue.id}
            </div>
            <div className="projectInfoAboutSomeIssueBlockData">
              {moment(issue.created_on).format("YYYY-MM-DD HH:MM")}
            </div>
            <div className="projectInfoAboutSomeIssueBlockStatus">
              <div>
                <div>Tracker</div>
                <div>{issue.tracker.name}</div>
              </div>
              <div>
                <div>Status</div>
                <div>{issue.status.name}</div>
              </div>
              <div>
                <div>Priority</div>
                <div>{issue.priority.name}</div>
              </div>
            </div>
            {issue.author.name && (
              <div className="projectInfoAboutSomeIssueBlockUsers">
                <div>Author:</div>
                <div>{issue.author.name}</div>
              </div>
            )}

            {issue.assigned_to && issue.assigned_to.name && (
              <div className="projectInfoAboutSomeIssueBlockUsers">
                <div>Assignee:</div>
                <div>{issue.assigned_to.name}</div>
              </div>
            )}

            {issue.subject && (
              <div className="projectInfoAboutSomeIssueBlockSubject">
                <div>Subject:</div>
                <div>{issue.subject}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(ProjectInfoIssueList);
