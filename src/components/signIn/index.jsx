import React, {Component} from 'react'
//-------------
//-------------
import {withRouter} from 'react-router-dom';
//-------------
import {css, StyleSheet} from 'aphrodite'
import {
    Icon,
    Segment,
    Label,
    Input,
} from 'semantic-ui-react'
//-------------
//-------------
//-------------


class SignIn extends Component {
    render() {
        return (
            <div className={css(styles.wrapper)}>
                <div className={css(styles.body)}>
                    <div>
                        <Label>Email</Label>
                        <Input placeholder="Email"/>
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input placeholder="Password"/>
                    </div>
                </div>

            </div>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        weight: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    body: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        padding: 10,
    }
})

export default withRouter(SignIn)
