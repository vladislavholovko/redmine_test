import React, {Component} from 'react'
//-------------
import * as userInfoActions from '../../actions/userActions/index'
//-------------
import {
    Button,
    Input,
    Form,
    Message,
} from 'semantic-ui-react'
import './index.css';
//-------------

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorMessage: '',
            username: '',
            password: ''
        }
    }

    onFormSubmit = async () => {
        try {
            let {username, password} = this.state;
            username = username.trim();
            if (!username)
                return this.setState({errorMessage: "Enter username"});
            if (!password)
                return this.setState({errorMessage: "Enter password"});
            this.setState({
                loading: true,
                errorMessage: '',
            });
            await userInfoActions.signIn(username, password);
            this.setState({
                loading: false,
            });
            this.props.history.push('/');
        } catch (error) {
            this.setState({loading: false, errorMessage: error.message});
            console.log(error)
        }
    };

    onChangeForm = (field, value) => {
        this.setState({
            [field]: value,
        })
    };

    render() {
        let {
            loading,
            errorMessage,
            username,
            password,
        } = this.state;

        // console.log("SIGN_IN_STATE", this.state)
        return (
            <div className="wrapper">
                <div className="body">
                    <Form
                        error={errorMessage ? true : false}
                        loading={loading}
                    >
                        <Message
                            error
                            content={errorMessage}
                        />
                        <Form.Field>
                            <label>Username</label>
                            <Input
                                name="login"
                                autoComplete="username"
                                type="text"
                                size="large"
                                autoCorrect="off"
                                placeholder="Username"
                                onChange={(e, data) =>
                                    this.onChangeForm('username', data.value)
                                }
                                value={username}
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

export default SignIn
