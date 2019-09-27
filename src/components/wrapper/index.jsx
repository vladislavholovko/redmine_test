import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router'
//-------------
import {css, StyleSheet} from 'aphrodite'
import {toast} from 'react-toastify'
//-------------
import {getTokenFromLocalStorage} from '../../actions/localStorage'
import * as userInfoActions from "../../actions/userActions";
//-------------
import PrivateRoute from './privateRoute'
import PageNotFound from "../pageNotFound/index";
import SignIn from "../signIn";
import HeaderBlock from "../header";
import ProjectBlock from "../project";
//-------------

class Wrapper extends Component {
    state = {
        initialized: false
    }

    componentDidMount = async () => {
        try {
            let key = await getTokenFromLocalStorage()
            if (!key) return
            await userInfoActions.getUserInfo(key)
        } catch (e) {
            toast.error("User Info Errors")
        } finally {
            this.setState({initialized: true})
        }
    }

    render() {
        const {initialized} = this.state
        let url = this.props.location.pathname
        if (url === '/') {
            this.props.history.push('/project')
        }

        return initialized ? (
            <div className={css(styles.wrapper)}>
                {url === "/signIn" ?
                    <Route path="/signIn" component={SignIn}/>
                    :
                    <div>
                        <HeaderBlock/>
                        <Switch>
                            <PrivateRoute path="/project" component={ProjectBlock}/>
                            <PrivateRoute component={PageNotFound}/>
                        </Switch>
                    </div>
                }
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

export default withRouter(Wrapper)