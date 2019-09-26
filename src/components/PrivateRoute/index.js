import React, {Component, Fragment} from 'react'
import {Redirect, withRouter, Route} from 'react-router-dom';
import {connect} from "react-redux";
//-------------
import { toast } from 'react-toastify'
//-------------

class PrivateRoute extends Component {
    render() {
        let {userInfo} = this.props
        /*if (!userInfo.api_key){
            toast.warn("You now have access to this page")
        }*/

        return (
            <Fragment>
                {
                    userInfo.api_key ?
                        <Route {...this.props} /> :
                        <Redirect to='/signIn'/>
                }
            </Fragment>
        )
    }
}

export default connect(state => ({
    userInfo: state.user,
}))(withRouter(PrivateRoute))
