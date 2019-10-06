import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
//-------------
import * as ProjectActions from "../../actions/projectActions/index";
//-------------
import { toast } from "react-toastify";
import { Table } from "semantic-ui-react";
import "./projects.css";
//-------------
import LoaderBlock from "../helpers/loading";
import InfoNotFound from "../helpers/notFoundBlocks/infoNotFound";
import moment from "moment";
import LimitList from "../helpers/filterBlocks/limitList";
import Pagination from "../helpers/filterBlocks/pagination/pagination";
//-------------

class ProjectsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 1
    };
  }

  componentDidMount = async () => {
    await this.loadProjects();
  };

  loadProjects = async resetPage => {
    try {
      let { limit } = this.props;
      let { page } = this.state;
      if (resetPage) page = 1;

      await ProjectActions.getAllProjects(limit, page);
      this.setState({ loading: false, page });
    } catch (error) {
      this.setState({ loading: false });
      toast.error(error.message);
    }
  };

  onChangeFilter = async (type, value, resetPage, dontReload) => {
    await this.setState({ ...this.state, [type]: value });
    if (!dontReload) {
      await this.loadProjects(resetPage);
    }
  };

  render() {
    let { projectsObject } = this.props;
    let { loading, page } = this.state;
    let projects = projectsObject.projects

    return !loading ? (
      <Fragment>
        {projects && projects.length > 0 ? (
          <div className="listProjectsBlock">
            <LimitList onChange={this.loadProjects} />
            <Table celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={5}>Project Name</Table.HeaderCell>
                  <Table.HeaderCell width={9}>
                    Project Description
                  </Table.HeaderCell>
                  <Table.HeaderCell width={2} textAlign="center">
                    Data Created
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {projects.map(project => (
                  <Table.Row key={`project_id:${project.id}`}>
                    <Table.Cell width={5}>
                      <Link to={`/project/${project.id}`}>{project.name}</Link>
                    </Table.Cell>
                    <Table.Cell width={9}>{project.description}</Table.Cell>
                    <Table.Cell width={2} textAlign="center">
                      {moment(project.created_on).format("YYYY-MM-DD HH:MM")}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Pagination
              page={page}
              totalCount={projectsObject.total_count}
              onChangePage={this.onChangeFilter}
            />
          </div>
        ) : (
          <InfoNotFound text="list project empty" />
        )}
      </Fragment>
    ) : (
      <LoaderBlock />
    );
  }
}

export default connect(state => ({
  userInfo: state.user,
  projectsObject: state.projects,
  limit: state.limit.limit
}))(withRouter(ProjectsBlock));
