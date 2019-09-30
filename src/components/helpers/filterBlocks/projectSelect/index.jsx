import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import { toast } from "react-toastify";
//-------------
import * as ProjectActions from "../../../../actions/projectActions";
import { Select } from "semantic-ui-react";
//-------------

class ProjectSelect extends Component {
  componentDidMount = async () => {
    await this.loadProjects();
  };

  loadProjects = async () => {
    try {
      let { projects } = this.props;
      if (projects && projects.length > 0) return;
      await ProjectActions.getAllProjects();
    } catch (error) {
      toast.error(error.message);
    }
  };

  render() {
    let { projects, selectedProject, onSelectedProject } = this.props;

    let optionListProject = [{ value: "all", text: "All" }];
    projects.map(project =>
      optionListProject.push({ value: project.id, text: project.name })
    );

    return (
      <Select
        fluid
        value={selectedProject}
        options={optionListProject}
        placeholder="Project List"
        onChange={(e, { value }) => onSelectedProject("selectedProject", value, true)}
      />
    );
  }
}

export default connect(state => ({
  projects: state.projects.projects
}))(withRouter(ProjectSelect));
