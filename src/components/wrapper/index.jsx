import React, {Component} from 'react'
//-------------
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//-------------
import {css, StyleSheet} from 'aphrodite'
import { toast } from 'react-toastify'
//-------------
import SignIn from "../signIn";
import Home from "../home/index";
import * as userInfoActions from "../../actions/userActions";
//-------------
import {getTokenFromLocalStorage} from '../../actions/localStorage'
//-------------
import PrivateRoute from  '../PrivateRoute'


class Wrapper extends Component {
    state = {
        initialized: false
    }

    componentDidMount =  async () => {
        try {
            let key =  await getTokenFromLocalStorage()
            if (!key) return
            await userInfoActions.getUserInfo(key)
        } catch (e) {
            toast.error("User Info Errors")
        } finally {
            this.setState({ initialized: true })
        }
    }

    render() {
        const {initialized} = this.state

        return initialized ? (
            <div className={css(styles.wrapper)}>
                <Router>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home}/>
                        <Route exact path="/signIn" component={SignIn}/>
                    </Switch>
                </Router>
            </div>
        ) : (
            <p>Loading...</p>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        weight: '100%',
    }
})

export default Wrapper