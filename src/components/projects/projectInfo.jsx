import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import * as ProjectActions from "../../actions/projectActions/index";
import * as IssuesActions from "../../actions/issuesActions";
//-------------
import { toast } from "react-toastify";
import { Table } from "semantic-ui-react";
//-------------
import LoaderBlock from "../helpers/loading";
import InfoNotFound from "../helpers/notFoundBlocks/infoNotFound";
import NewSpentTimeModal from "../helpers/addSpentTime";
import CommentsBlock from "../helpers/commentsBlock";
import LimitList from "../helpers/filterBlocks/limitList";
import Pagination from "../helpers/filterBlocks/pagination/pagination";
//-------------

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      project: null,
      issues: {},
      page: 1
    };
  }

  componentDidMount = async () => {
    await this.loadProject(this.props.match.params.id);
    await this.loadIssues();
  };

  loadProject = async projectId => {
    try {
      this.setState({ loading: true });
      let project = await ProjectActions.getProject(projectId);
      this.setState({ loading: false, project });
    } catch (error) {
      this.setState({ loading: false });
      toast.error(error.message);
    }
  };

  loadIssues = async resetPage => {
    let { page } = this.state;
    let { limit } = this.props;
    let selectedProject = this.props.match.params.id;

    if (resetPage) page = 1;

    try {
      this.setState({ loading: true });
      let issues = await IssuesActions.getAllIssues(
        limit,
        page,
        selectedProject,
        null,
        true
      );
      this.setState({ loading: false, page, issues });
    } catch (error) {
      if (!selectedProject) {
        toast.error(error.message);
      } else {
        toast.warn("List Issues Empty");
      }
      this.setState({ loading: false });
    }
  };

  onChangeFilter = async (type, value, resetPage) => {
    await this.setState({ ...this.state, [type]: value });
    await this.loadIssues(resetPage);
  };

  onRedirectToIssueInfo = async issueId => {
    this.props.history.push(`/issues/${issueId}`);
  };

  render() {
    // console.log("PROJECT_STATE", this.state);
    let { loading, project, issues, page } = this.state;
    let ListIssues = issues.issues;

    return !loading ? (
      <div>
        {project ? (
          <div>
            <p>{project.name}</p>
            <i>{project.description}</i>
            <div className="listIssuesBlock">
              <NewSpentTimeModal projectId={project.id}/>
              <div>
                {issues && issues.total_count && (
                  <i>Issues Count {issues.total_count}</i>
                )}
              </div>
              {ListIssues && ListIssues.length > 0 ? (
                <div>
                  <LimitList onChange={this.loadIssues} />
                  <Table celled selectable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Tracker</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Priority</Table.HeaderCell>
                        <Table.HeaderCell>Subject</Table.HeaderCell>
                        <Table.HeaderCell>Author</Table.HeaderCell>
                        <Table.HeaderCell>Assignee</Table.HeaderCell>
                        <Table.HeaderCell>Updated</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {ListIssues.map(issue => (
                        <Table.Row
                          key={`project=${project.id}_issue_id:${issue.id}`}
                          onClick={() => this.onRedirectToIssueInfo(issue.id)}
                        >
                          <Table.Cell>{issue.id}</Table.Cell>
                          <Table.Cell>{issue.tracker.name}</Table.Cell>
                          <Table.Cell textAlign="right">
                            {issue.status.name}
                          </Table.Cell>
                          <Table.Cell textAlign="right">
                            {issue.priority.name}
                          </Table.Cell>
                          <Table.Cell textAlign="right">
                            {issue.subject}
                          </Table.Cell>
                          <Table.Cell textAlign="right">
                            {issue.author.name}
                          </Table.Cell>
                          <Table.Cell textAlign="right">
                            {issue.assigned_to && issue.assigned_to.name}
                          </Table.Cell>
                          <Table.Cell textAlign="right">
                            {issue.created_on}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  <Pagination
                    page={page}
                    totalCount={issues.total_count}
                    onChangePage={this.onChangeFilter}
                  />
                </div>
              ) : (
                <InfoNotFound text="list issues not found" />
              )}
            </div>
            <CommentsBlock typeComment="project" valueId={project.id}/>
          </div>
        ) : (
          <InfoNotFound text="project not found" />
        )}
      </div>
    ) : (
      <LoaderBlock />
    );
  }
}

export default connect(state => ({
  userInfo: state.user,
  limit: state.limit.limit
}))(withRouter(ProjectInfo));
