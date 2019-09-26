import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Redirect} from 'react-router-dom';
//-------------
import * as userInfoActions from '../../actions/userActions/index'
//-------------
import './index.css';
import {toast} from "react-toastify";
import {
    Button,
    Input,
    Form,
    Message,
} from 'semantic-ui-react'
//-------------

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorMessage: '',
            username: '',
            password: '',
            redirectToHome: false,
        }
    }

    componentDidMount = async () => {
        let {userInfo} = this.props
        if (userInfo.api_key) {
            toast.info("You are already registered")
            this.setState({
                redirectToHome: true,
            })
        }
    }

    onFormSubmit = async () => {
        try {
            let {username, password} = this.state;
            username = username.trim();

            if (!username) {
                toast.warn("Enter a username")
                return this.setState({errorMessage: "Enter a username"});
            }
            if (!password) {
                toast.warn("Enter a password")
                return this.setState({errorMessage: "Enter a password"});
            }

            this.setState({
                loading: true,
                errorMessage: '',
            });
            let response = await userInfoActions.signIn(username, password);
            toast.success("You have been successfully authorized")
            if (response){
                this.setState({
                    loading: false,
                    redirectToHome: true,
                });
            }
        } catch (error) {
            this.setState({loading: false, errorMessage: error.message});
            toast.error(error.message)
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
            redirectToHome,
        } = this.state;

        if (redirectToHome === true) {
            return <Redirect to='/' />
        }

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

export default connect(state => ({
    userInfo: state.user,
}))(withRouter(SignIn))