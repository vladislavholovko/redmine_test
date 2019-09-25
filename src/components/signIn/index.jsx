import React, {Component} from 'react'
//-------------
import {withRouter} from 'react-router-dom';
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

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            errorMessage: '',
            email: '',
            password: ''
        }
    }

    onFormSubmit = async () => {
        try {
            let {email, password} = this.state
            email = email.trim()
            if (!email)
                return this.setState({errorMessage: "Enter email"})
            if (!password)
                return this.setState({errorMessage: "Enter password"})
            this.setState({
                loading: true,
                errorMessage: '',
            })
            // await tokenActions.get(login, password)
            // this.props.history.push('/profile')
            console.log("УРА")
            this.setState({
                loading: false,
            })
        } catch (error) {
            this.setState({loading: false, errorMessage: error.message})
            console.log(error)
        }
    }

    onChangeForm = (field, value) => {
        this.setState({
            [field]: value,
        })
    }

    render() {
        let {
            loading,
            errorMessage,
            email,
            password,
        } = this.state
        console.log("SIGN_IN_STATE", this.state)
        return (
            <div className={css(styles.wrapper)}>
                <div className={css(styles.body)}>
                    <Form
                        error={errorMessage}
                        loading={loading}
                    >
                        <Message
                            error
                            content={errorMessage}
                        />
                        <Form.Field>
                            <label>Email</label>
                            <Input
                                name="login"
                                autoComplete="username"
                                type="text"
                                size="large"
                                autoCorrect="off"
                                placeholder="Email"
                                onChange={(e, data) =>
                                    this.onChangeForm('email', data.value)
                                }
                                value={email}
                                label={{icon: 'asterisk'}}
                                labelPosition="right corner"
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input
                                name="password"
                                autoCapitalize="off"
                                size="large"
                                type="password"
                                autoCorrect="off"
                                autoComplete="current-password"
                                placeholder="Password"
                                onChange={(e, data) =>
                                    this.onChangeForm('password', data.value)
                                }
                                value={password}
                                label={{icon: 'asterisk'}}
                                labelPosition="right corner"
                            />
                        </Form.Field>
                        <Button
                            children="LogIn"
                            primary
                            fluid
                            size="large"
                            onClick={() => this.onFormSubmit()}
                            type="submit"
                        />
                    </Form>
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
