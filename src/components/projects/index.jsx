import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
//-------------
import {toast} from "react-toastify";
import {Table} from 'semantic-ui-react'
//-------------
import * as ProjectActions from '../../actions/projectActions/index'
//-------------
import LoaderBlock from "../helpers/loading";
//-------------

class ProjectsBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    componentDidMount = async () => {
        await this.loadProjects()
    }

    loadProjects = async () => {
        try {
            await ProjectActions.getAllProjects()
            this.setState({loading: false})
        } catch (error) {
            this.setState({loading: false,});
            toast.error(error.message)
        }
    }


    render() {
        let {projects} = this.props
        let {loading} = this.state

        console.log("LIST_PROJECTS_PROPS", this.props)

        /*id(pin):891
        name(pin):"GigX (Fractional CXO)"
        identifier(pin):"fractional-cxo"
        description(pin):"Drupal 8 website"
        status(pin):1
        created_on(pin):"2018-03-28T06:40:43Z"
        updated_on(pin):"2018-05-30T12:43:23Z"*/

        return (
            !loading ?
                <div>
                    {projects && projects.length > 0 ?
                        <div>
                            <Table celled inverted selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Project Name</Table.HeaderCell>
                                        <Table.HeaderCell>Project Description</Table.HeaderCell>
                                        <Table.HeaderCell>Data Created</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {projects.map(project =>
                                        <Table.Row key={`project_id:${project.id}`}>
                                            <Table.Cell>
                                                <Link
                                                    to={`/project/${project.id}`}
                                                >
                                                    {project.name}
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>{project.description}</Table.Cell>
                                            <Table.Cell textAlign='right'>{project.created_on}</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </div> : <div>LIST PROJECTS NOT FOUND</div>}
                </div> :
                <LoaderBlock/>
        )
    }
}

export default connect(state => ({
    userInfo: state.user,
    projects: state.projects.projects
}))(withRouter(ProjectsBlock))
