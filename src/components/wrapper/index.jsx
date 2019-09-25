import React, {Component} from 'react'
//-------------
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//-------------
import {css, StyleSheet} from 'aphrodite'
//-------------
import SignIn from "../signIn";
import Home from "../home/index";
//-------------

//-------------

class Wrapper extends Component {
    render() {
        return (
            <div className={css(styles.wrapper)}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/signIn" component={SignIn}/>
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