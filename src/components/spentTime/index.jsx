import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
//-------------
import * as TimeActions from "../../actions/spentTimeActions/index";
//-------------
import { toast } from "react-toastify";
import { Table } from "semantic-ui-react";
//-------------
import Pagination from "../helpers/filterBlocks/pagination/pagination";
import LoaderBlock from "../helpers/loading";
import InfoNotFound from "../helpers/notFoundBlocks/infoNotFound";
import LimitList from "../helpers/filterBlocks/limitList/index";
import ProjectSelect from "../helpers/filterBlocks/projectSelect";
import InputFilter from "../helpers/filterBlocks/inputFilter";
import moment from "moment";
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
        <div className="filterComponent">
          <div className="filterComponentInputs">
            <InputFilter
              placeholder="Issue ID"
              type="issueId"
              propsId={issueId}
              onLoad={this.loadSpentTime}
              onChangeFilter={this.onChangeFilter}
            />
            <ProjectSelect
              selectedProject={selectedProject}
              onSelectedProject={this.onChangeFilter}
            />
          </div>
          <div>
            <LimitList onChange={this.loadSpentTime} />
          </div>
        </div>
        {ListSpentTime && ListSpentTime.length > 0 ? (
          <div>
            <Table celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={3}>Project</Table.HeaderCell>
                  <Table.HeaderCell width={2}>User</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    Activity
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    Issues
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>Comment</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={1}>
                    Hours
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    Date
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {ListSpentTime.map(time => (
                  <Table.Row key={`spentTime_id:${time.id}`}>
                    <Table.Cell width={3}>
                      <Link to={`/project/${time.project.id}`}>
                        {time.project.name}
                      </Link>
                    </Table.Cell>

                    <Table.Cell width={2}>{time.user.name}</Table.Cell>
                    <Table.Cell textAlign="center" width={2}>
                      {time.activity.name}
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={2}>
                      {time.issue && time.issue.id && (
                        <Link to={`/issues/${time.issue.id}`}>
                          {`Bug #${time.issue.id}`}
                        </Link>
                      )}
                    </Table.Cell>
                    <Table.Cell width={4}>{time.comments}</Table.Cell>
                    <Table.Cell textAlign="center" width={1}>
                      {time.hours}
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={2}>
                      {moment(time.created_on).format("YYYY-MM-DD HH:MM")}
                    </Table.Cell>
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
          <InfoNotFound text="list spent time empty" />
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
