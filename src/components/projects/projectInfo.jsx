import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import * as ProjectActions from "../../actions/projectActions/index";
import * as IssuesActions from "../../actions/issuesActions";
//-------------
import { toast } from "react-toastify";
import "./projects.css";
//-------------
import LoaderBlock from "../helpers/loading";
import InfoNotFound from "../helpers/notFoundBlocks/infoNotFound";
import NewSpentTimeModal from "../helpers/addSpentTime";
import ProjectInfoIssueList from "./projectInfoIssueList";
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
    let { loading, project, issues, page } = this.state;
    let ListIssues = issues.issues;

    return !loading ? (
      <div className="listProjectsBlock">
        {project ? (
          <div className="projectInfoBlock">
            <div className="projectInfoBlockTitle">
              <b>{project.name}</b>
              <p>{project.description}</p>
            </div>
            {ListIssues && ListIssues.length > 0 ? (
              <div>
                <div className="filterComponentInputs">
                  {issues && issues.total_count && (
                    <div className="totalCountLength">
                      <p>Issues Count:</p> <b>{issues.total_count}</b>
                    </div>
                  )}
                  <div className="addButtonBlock">
                    <NewSpentTimeModal projectId={project.id} />
                  </div>
                  <LimitList onChange={this.loadIssues} />
                </div>
                <div>
                  <ProjectInfoIssueList
                    projectId={project.id}
                    ListIssues={ListIssues}
                    onRedirectToIssueInfo={this.onRedirectToIssueInfo}
                  />
                  <Pagination
                    page={page}
                    totalCount={issues.total_count}
                    onChangePage={this.onChangeFilter}
                  />
                </div>
              </div>
            ) : (
              <InfoNotFound text="list issues not found" />
            )}

            <CommentsBlock typeComment="project" valueId={project.id} />
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
