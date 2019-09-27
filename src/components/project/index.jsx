import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {
    Button,
    Input,
    Form,
    Message,
    Menu
} from 'semantic-ui-react'

//-------------
class ProjectBlock extends Component {
    constructor (props){
        super(props)
        this.state={
        }
    }

    render() {
        // console.log("PROJECT_PROPS", this.props)
        return (
            <div>
                project
            </div>
        )
    }
}

export default connect(state => ({
    userInfo: state.user,
}))(withRouter(ProjectBlock))
