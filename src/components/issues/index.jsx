import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
//-------------
import * as IssuesActions from "../../actions/issuesActions/index";
//-------------
import { toast } from "react-toastify";
import { Table } from "semantic-ui-react";
import "./issues.css";
//-------------
import Pagination from "../helpers/filterBlocks/pagination/pagination";
import LoaderBlock from "../helpers/loading";
import InfoNotFound from "../helpers/notFoundBlocks/infoNotFound";
import LimitList from "../helpers/filterBlocks/limitList/index";
import ProjectSelect from "../helpers/filterBlocks/projectSelect/index";
import InputFilter from "../helpers/filterBlocks/inputFilter";
import moment from "moment";
//-------------

class IssuesBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      selectedProject: "all",
      issueId: ""
    };
  }

  componentDidMount = async () => {
    await this.loadIssues();
  };

  loadIssues = async resetPage => {
    let { page, selectedProject, issueId } = this.state;
    let { limit } = this.props;

    if (resetPage) page = 1;
    if (selectedProject === "all") selectedProject = null;

    try {
      this.setState({ loading: true });
      await IssuesActions.getAllIssues(limit, page, selectedProject, issueId);
      this.setState({ loading: false, page });
    } catch (error) {
      if (!selectedProject || selectedProject === "all") {
        toast.error(error.message);
      } else {
        toast.warn("List Issues Empty. Please selected other project");
      }
      this.setState({ loading: false });
    }
  };

  onChangeFilter = async (type, value, resetPage, dontReload) => {
    await this.setState({ ...this.state, [type]: value });
    if (!dontReload) {
      await this.loadIssues(resetPage);
    }
  };

  render() {
    let { issues } = this.props;
    let { loading, page, selectedProject, issueId } = this.state;
    let ListIssues = issues.issues;

    return !loading ? (
      <div className="listIssuesBlock">
        <div className="filterComponent">
          <div className="filterComponentInputs">
            <InputFilter
              placeholder="Issue ID"
              type="issueId"
              propsId={issueId}
              onLoad={this.loadIssues}
              onChangeFilter={this.onChangeFilter}
            />
            <ProjectSelect
              selectedProject={selectedProject}
              onSelectedProject={this.onChangeFilter}
            />
          </div>
          <div>
            <LimitList onChange={this.loadIssues} />
          </div>
        </div>
        {ListIssues && ListIssues.length > 0 ? (
          <div>
            <Table celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>#</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Project</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={1}>
                    Tracker
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={1}>
                    Status
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={1}>
                    Priority
                  </Table.HeaderCell>
                  <Table.HeaderCell width={3}>Subject</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    Author
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    Assignee
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    Updated
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {ListIssues.map(issue => (
                  <Table.Row key={`issue_id:${issue.id}`}>
                    <Table.Cell width={1}>
                      <Link to={`/issues/${issue.id}`}>{issue.id}</Link>
                    </Table.Cell>
                    <Table.Cell width={3}>
                      <Link to={`/project/${issue.project.id}`}>
                        {issue.project.name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={1}>
                      {issue.tracker.name}
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={1}>
                      {issue.status.name}
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={1}>
                      {issue.priority.name}
                    </Table.Cell>
                    <Table.Cell width={3}>{issue.subject}</Table.Cell>
                    <Table.Cell textAlign="center" width={2}>
                      {issue.author.name}
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={2}>
                      {issue.assigned_to && issue.assigned_to.name}
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={2}>
                      {moment(issue.created_on).format("YYYY-MM-DD HH:MM")}
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
          <InfoNotFound text="list issues empty" />
        )}
      </div>
    ) : (
      <LoaderBlock />
    );
  }
}

export default connect(state => ({
  issues: state.issues,
  limit: state.limit.limit
}))(withRouter(IssuesBlock));
