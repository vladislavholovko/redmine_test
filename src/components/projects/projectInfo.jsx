import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//-------------
import { toast } from "react-toastify";
import { Table } from "semantic-ui-react";
//-------------
import * as ProjectActions from "../../actions/projectActions/index";
import { Link } from "react-router-dom";

//-------------

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      project: null
    };
  }

  componentDidMount = async () => {
    this.loadProject(this.props.match.params.id);
  };

  loadProject = async projectId => {
    try {
      let project = await ProjectActions.getProject(projectId);
      this.setState({ loading: false, project });
    } catch (error) {
      this.setState({ loading: false });
      toast.error(error.message);
    }
  };

  render() {
    let { loading, project } = this.state;
    console.log("PROJECT_STATE", this.state);

    /*id(pin):891
        name(pin):"GigX (Fractional CXO)"
        identifier(pin):"fractional-cxo"
        description(pin):"Drupal 8 website"
        status(pin):1
        created_on(pin):"2018-03-28T06:40:43Z"
        updated_on(pin):"2018-05-30T12:43:23Z"*/

    return !loading ? (
      <div>{project ? <div>INFO</div> : <div>PROJECT NOT FOUND</div>}</div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default connect(state => ({
  userInfo: state.user
}))(withRouter(ProjectInfo));
