import React, {Component} from 'react'
//-------------
import {getTokenFromLocalStorage} from '../../actions/localStorage'
import * as userInfoActions from '../../actions/userActions/index'
//-------------
import {
    Button,
    Input,
    Form,
    Message,
} from 'semantic-ui-react'
//-------------
import Header from './header'
//-------------
//-------------

class Home extends Component {
    render() {
        return <div>
            <Header/>
        </div>
    }
}

export default Home