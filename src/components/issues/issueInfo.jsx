import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import * as IssuesActions from "../../actions/issuesActions";
import * as TimeActions from "../../actions/spentTimeActions";
//-------------
import { toast } from "react-toastify";
import { Table } from "semantic-ui-react";
//-------------
import LoaderBlock from "../helpers/loading";
import InfoNotFound from "../helpers/notFoundBlocks/infoNotFound";
import LimitList from "../helpers/filterBlocks/limitList";
import Pagination from "../helpers/filterBlocks/pagination/pagination";
import NewSpentTimeModal from "../helpers/addSpentTime";
import CommentsBlock from "../helpers/commentsBlock";
import SpentTimeList from "./spentTimeList";
//-------------

class IssueInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      issue: null,
      spentTime: {},
      page: 1
    };
  }

  componentDidMount = async () => {
    await this.loadIssue(this.props.match.params.id);
    await this.loadSpentTime();
  };

  loadIssue = async issueId => {
    try {
      this.setState({ loading: true });
      let issue = await IssuesActions.getIssue(issueId);
      this.setState({ loading: false, issue });
    } catch (error) {
      this.setState({ loading: false });
      toast.error(error.message);
    }
  };

  loadSpentTime = async resetPage => {
    let { page } = this.state;
    let { limit } = this.props;

    let issueId = this.props.match.params.id;
    if (resetPage) page = 1;

    try {
      this.setState({ loading: true });
      let spentTime = await TimeActions.getAllSpentTime(
        limit,
        page,
        null,
        issueId,
        true
      );
      this.setState({ loading: false, page, spentTime });
    } catch (error) {
      toast.warn("Time Empty. Please selected other issue");
      this.setState({ loading: false });
    }
  };

  onChangeFilter = async (type, value, resetPage, dontReload) => {
    await this.setState({ ...this.state, [type]: value });
    if (!dontReload) {
      await this.loadSpentTime(resetPage);
    }
  };

  onRedirectToIssueInfo = async projectId => {
    this.props.history.push(`/project/${projectId}`);
  };

  render() {
    let { loading, issue, page, spentTime } = this.state;
    let ListSpentTime = spentTime.time_entries;

    return !loading ? (
      <div className="listIssuesBlock">
        {issue ? (
          <div className="issuesInfoBlock">
            <div className="issuesInfoBlockTitle">
              <b
                onClick={() => {
                  this.onRedirectToIssueInfo(issue.project.id);
                }}
              >
                {issue.project.name}
              </b>
              <p>Issue №:{issue.id}</p>
            </div>
            <div className="filterComponentInputs">
              {ListSpentTime &&
                ListSpentTime.length > 0 &&
                spentTime &&
                spentTime.total_count && (
                  <div className="totalCountLength">
                    <p>Spent Time Count:</p> <b>{spentTime.total_count}</b>
                  </div>
                )}
              <div className="addButtonBlock">
                <NewSpentTimeModal issueId={issue.id} />
              </div>
              {ListSpentTime && ListSpentTime.length > 0 && (
                <LimitList onChange={this.loadSpentTime} />
              )}
            </div>

            <div>
              {ListSpentTime && ListSpentTime.length > 0 ? (
                <div>
                  <SpentTimeList ListSpentTime={ListSpentTime} />
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
            <CommentsBlock typeComment="issue" valueId={issue.id} />
          </div>
        ) : (
          <InfoNotFound text="issue not found" />
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
}))(withRouter(IssueInfo));
