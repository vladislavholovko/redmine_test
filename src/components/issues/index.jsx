import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
//-------------
import {toast} from "react-toastify";
import {Table, Select} from 'semantic-ui-react'
import './issues.css'
//-------------
import * as IssuesActions from '../../actions/issuesActions/index'
import * as ProjectActions from "../../actions/projectActions";
//-------------
import Pagination from '../helpers/pagination/pagination'
import LoaderBlock from "../helpers/loading";
import InfoNotFound from "../helpers/notFoundBlocks/infoNotFound";
import LimitList from "../helpers/limitList/index"
//-------------

class IssuesBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            page: 1,
            selectedProject: 'all'
        }
    }

    componentDidMount = async () => {
        await this.loadIssues()
        await this.loadProjects()
    }

    loadIssues = async (resetPage) => {
        try {
            this.setState({loading: true})
            let {page, selectedProject} = this.state
            let {limit} = this.props

            if (resetPage) page = 1
            if (selectedProject === 'all') selectedProject = null

            await IssuesActions.getAllIssues(limit, page, selectedProject)
            this.setState({loading: false, page})
        } catch (error) {
            this.setState({loading: false,});
            toast.error(error.message)
        }
    }

    loadProjects = async () => {
        try {
            this.setState({loading: true})
            await ProjectActions.getAllProjects()
            this.setState({loading: false})
        } catch (error) {
            this.setState({loading: false,});
            toast.error(error.message)
        }
    }

    onChangePage = async (page) => {
        await this.setState({page})
        await this.loadIssues(false)
    }

    selectedProject = async (selectedProject) => {
        await this.setState({selectedProject})
        await this.loadIssues(true)
    }

    render() {
        let {issues, projects, limit} = this.props
        let {loading, page, selectedProject} = this.state

        let ListIssues = issues.issues
        let optionListProject = [{value: 'all', text: 'All'}]
        projects.map(project =>
            optionListProject.push({value: project.id, text: project.name}))

        return (
            !loading ?
                <div className='listIssuesBlock'>
                    {ListIssues && ListIssues.length > 0 ?
                        <div>
                            <div>
                                <Select
                                    fluid
                                    value={selectedProject}
                                    options={optionListProject}
                                    placeholder="Project List"
                                    onChange={(e, {value}) => this.selectedProject(value)}
                                />
                                <LimitList onChange={this.loadIssues}/>
                            </div>

                            <Table celled inverted selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                        <Table.HeaderCell>Project</Table.HeaderCell>
                                        <Table.HeaderCell>Tracker</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                        <Table.HeaderCell>Priority</Table.HeaderCell>
                                        <Table.HeaderCell>Subject</Table.HeaderCell>
                                        <Table.HeaderCell>Author</Table.HeaderCell>
                                        <Table.HeaderCell>Assignee</Table.HeaderCell>
                                        <Table.HeaderCell>Updated</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {ListIssues.map(issue =>
                                        <Table.Row key={`issue_id:${issue.id}`}>
                                            <Table.Cell>{issue.id}</Table.Cell>
                                            <Table.Cell>
                                                <Link
                                                    to={`/project/${issue.project.id}`}
                                                >
                                                    {issue.project.name}
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>{issue.tracker.name}</Table.Cell>
                                            <Table.Cell textAlign='right'>{issue.status.name}</Table.Cell>
                                            <Table.Cell textAlign='right'>{issue.priority.name}</Table.Cell>
                                            <Table.Cell textAlign='right'>{issue.subject}</Table.Cell>
                                            <Table.Cell textAlign='right'>{issue.author.name}</Table.Cell>
                                            <Table.Cell
                                                textAlign='right'>{issue.assigned_to && issue.assigned_to.name}</Table.Cell>
                                            <Table.Cell textAlign='right'>{issue.created_on}</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                            <Pagination
                                limit={limit}
                                page={page}
                                totalCount={issues.total_count}
                                onChangePage={this.onChangePage}
                            />
                        </div> : <InfoNotFound text="list issues not found"/>}
                </div> :
                <LoaderBlock/>
        )
    }
}

export default connect(state => ({
    issues: state.issues,
    limit: state.limit.limit,
    projects: state.projects.projects
}))(withRouter(IssuesBlock))