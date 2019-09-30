import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
//-------------
import { toast } from "react-toastify";
import { Table } from "semantic-ui-react";
//-------------
import * as TimeActions from "../../actions/spentTimeActions/index";
//-------------
import Pagination from "../helpers/filterBlocks/pagination/pagination";
import LoaderBlock from "../helpers/loading";
import InfoNotFound from "../helpers/notFoundBlocks/infoNotFound";
import LimitList from "../helpers/filterBlocks/limitList/index";
import ProjectSelect from "../helpers/filterBlocks/projectSelect";
import IssueFilter from "../helpers/filterBlocks/issueFilter";
//-------------

class SpentTimeBlock extends Component {
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
    await this.loadSpentTime();
  };

  loadSpentTime = async resetPage => {
    let { page, selectedProject, issueId } = this.state;
    let { limit } = this.props;
    if (resetPage) page = 1;
    if (selectedProject === "all") selectedProject = null;

    try {
      this.setState({ loading: true });
      await TimeActions.getAllSpentTime(limit, page, selectedProject, issueId);
      this.setState({ loading: false, page });
    } catch (error) {
      if (!selectedProject || selectedProject === "all") {
        toast.error(error.message);
      } else {
        toast.warn("List Time Empty. Please selected other project");
      }
      this.setState({ loading: false });
    }
  };

  onChangeFilter = async (type, value, resetPage, dontReload) => {
    await this.setState({ ...this.state, [type]: value });
    if (!dontReload) {
      await this.loadSpentTime(resetPage);
    }
  };

  render() {
    let { spentTime } = this.props;
    let { loading, page, selectedProject, issueId } = this.state;
    let ListSpentTime = spentTime.time_entries;

    return !loading ? (
      <div className="listIssuesBlock">
        <div>
          <ProjectSelect
            selectedProject={selectedProject}
            onSelectedProject={this.onChangeFilter}
          />
          <IssueFilter
            issueId={issueId}
            onLoad={this.loadSpentTime}
            onChangeIssue={this.onChangeFilter}
          />
          <LimitList onChange={this.loadSpentTime} />
        </div>
        {ListSpentTime && ListSpentTime.length > 0 ? (
          <div>
            <Table celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Project</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>User</Table.HeaderCell>
                  <Table.HeaderCell>Activity</Table.HeaderCell>
                  <Table.HeaderCell>Issues</Table.HeaderCell>
                  <Table.HeaderCell>Comment</Table.HeaderCell>
                  <Table.HeaderCell>Hours</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {ListSpentTime.map(time => (
                  <Table.Row key={`spentTime_id:${time.id}`}>
                    <Table.Cell>
                      <Link to={`/project/${time.project.id}`}>
                        {time.project.name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{time.created_on}</Table.Cell>
                    <Table.Cell textAlign="right">{time.user.name}</Table.Cell>
                    <Table.Cell textAlign="right">
                      {time.activity.name}
                    </Table.Cell>
                    <Table.Cell textAlign="right">{`Bug #${time.issue &&
                      time.issue.id}`}</Table.Cell>
                    <Table.Cell textAlign="right">{time.comments}</Table.Cell>
                    <Table.Cell textAlign="right">{time.hours}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Pagination
              page={page}
              totalCount={spentTime.total_count}
              onChangePage={this.onChangeFilter}
            />
          </div>
        ) : (
          <InfoNotFound text="list issues not found" />
        )}
      </div>
    ) : (
      <LoaderBlock />
    );
  }
}

export default connect(state => ({
  spentTime: state.spentTime,
  limit: state.limit.limit
}))(withRouter(SpentTimeBlock));
