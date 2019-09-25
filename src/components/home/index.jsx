import React, {Component} from 'react'
//-------------
import {withRouter} from 'react-router-dom';
//-------------
import {getTokenFromLocalStorage} from '../../actions/localStorage'
import * as userInfoActions from '../../actions/userActions/index'
//-------------
import {css, StyleSheet} from 'aphrodite'
import {
    Button,
    Input,
    Form,
    Message,
} from 'semantic-ui-react'
//-------------
//-------------
//-------------

class Home extends Component {
    componentDidMount() {
        this.load()
    }

    load = async () => {
        let api_key = getTokenFromLocalStorage()
        if (!api_key) {
            this.props.history.push('/signIn')
        } else {
            await userInfoActions.getUserInfo(api_key)
        }
    }

    render() {
        return <div>1</div>
    }
}

export default withRouter(Home)