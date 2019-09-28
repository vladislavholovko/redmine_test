import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
//-------------
import {toast} from "react-toastify";
import {Table} from 'semantic-ui-react'
//-------------
import * as IssuesActions from '../../actions/issuesActions/index'
//-------------
import Pagination from '../helpers/pagination/pagination'
import LoaderBlock from "../helpers/loading";
//-------------

class IssuesBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            limit: 25,
            page: 1,
        }
    }

    componentDidMount = async () => {
        await this.loadIssues()
    }

    loadIssues = async () => {
        try {
            let {limit, page} = this.state
            await IssuesActions.getAllIssues(limit, page)
            this.setState({loading: false})
        } catch (error) {
            this.setState({loading: false,});
            toast.error(error.message)
        }
    }

    onChangePage = async (page) => {
        try {
            this.setState({loading: true})
            let {limit} = this.state
            await IssuesActions.getAllIssues(limit, page)
            this.setState({loading: false, page})
        } catch (error) {
            this.setState({loading: false,});
            toast.error(error.message)
        }
    }

    render() {
        let {issues} = this.props
        let {loading, limit, page} = this.state
        let ListIssues = issues.issues
        console.log("LIST_ISSUES_PROPS", this.props)

        /*   assigned_to: {id: 392, name: "Artem Kravchenko"}
           author: {id: 392, name: "Artem Kravchenko"}
           created_on: "2019-09-03T07:33:18Z"
           custom_fields: [{…}]
           description: ""
           done_ratio: 0
           id: 57433
           priority: {id: 2, name: "Normal"}
           project: {id: 891, name: "GigX (Fractional CXO)"}
           start_date: "2019-08-30"
           status: {id: 1, name: "New"}
           subject: "Transfer data to analytics after payment"
           tracker: {id: 4, name: "Task"}
           updated_on: "2019-09-03T07:33:18Z"*/

        return (
            !loading ?
                <div>
                    {ListIssues && ListIssues.length > 0 ?
                        <div>
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
                        </div> : <div>LIST iSSUES NOT FOUND</div>}
                </div> :
                <LoaderBlock/>
        )
    }
}

export default connect(state => ({
    issues: state.issues,
}))(withRouter(IssuesBlock))