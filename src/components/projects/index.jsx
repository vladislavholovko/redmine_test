import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
//-------------
import {toast} from "react-toastify";
import {Table} from 'semantic-ui-react'
import './projects.css'
//-------------
import * as ProjectActions from '../../actions/projectActions/index'
//-------------
import LoaderBlock from "../helpers/loading";
import InfoNotFound from "../helpers/notFoundBlocks/infoNotFound"
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

        return (
            !loading ?
                <Fragment>
                    {projects && projects.length > 0 ?
                        <div className='listProjectsBlock'>
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
                        </div> : <InfoNotFound text="list project not found"/>}
                </Fragment> :
                <LoaderBlock/>
        )
    }
}

export default connect(state => ({
    userInfo: state.user,
    projects: state.projects.projects
}))(withRouter(ProjectsBlock))
