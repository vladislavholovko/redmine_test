import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {
    Button,
    Input,
    Form,
    Message,
} from 'semantic-ui-react'

import * as userInfoActions from "../../../actions/userActions";
import {deleteTokenFromLocalStorage} from '../../../actions/localStorage/index'
//-------------
class Header extends Component {
    logOut = async () => {
        console.log("+_+")
        await userInfoActions.signOut()
        this.props.history.push('/signIn');
    }

    render() {
        let {userInfo} = this.props
        console.log("HEADER_PROPS", this.props)
        return (
            <div>
                <div>{userInfo.firstname}</div>
                <div><Button onClick={()=>this.logOut()}>logOut</Button></div>
            </div>
        )
    }
}

export default connect(state => ({
    userInfo: state.user,
}))(withRouter(Header))
