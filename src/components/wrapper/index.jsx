import React, {Component} from 'react'
//-------------
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//-------------
import {css, StyleSheet} from 'aphrodite'
//-------------
import SignIn from "../signIn";
//-------------

//-------------

class Wrapper extends Component {
    render() {
        return (
            <div className={css(styles.wrapper)}>
                <Router>
                    <Switch>
                        <Route path="/" component={SignIn}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Wrapper

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        weight: '100%',
    }
})