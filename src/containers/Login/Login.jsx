import './index.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authActions } from 'store/api/auth'
import LightButton from 'components/Button/LightButton'
import UnderlineTextInput from 'components/TextInput/UnderlineTextInput'
import request from 'utils/request'
import ViraspaceLogo from 'images/viraspace_logo.png'

class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    login() {
        const { username, password } = this.state

        request
            .post('/auth/login/', { username, password })
            .then(res => {
                const authToken = res.data.token
                const userId = res.data.id
                this.props.login(authToken, userId)
                return this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    onUsernameChange(value) {
        this.setState({ username: value })
    }

    onPasswordChange(value) {
        this.setState({ password: value })
    }

    render() {
        const { username, password } = this.state
        return (
            <div className="login-page">
                <div className="login-form">
                    <img id="viraspace-logo" src={ViraspaceLogo} alt="logo"></img>
                    <h1>Login</h1>
                    <UnderlineTextInput
                        width="100%"
                        value={username}
                        onChange={this.onUsernameChange.bind(this)}
                        type={'text'}
                        placeholder={'Username'}
                    ></UnderlineTextInput>
                    <UnderlineTextInput
                        width="100%"
                        value={password}
                        onChange={this.onPasswordChange.bind(this)}
                        type={'password'}
                        placeholder={'Password'}
                    ></UnderlineTextInput>
                    <LightButton onClick={this.login.bind(this)}>Login</LightButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { isAuthenticated: state.authReducer.isAuthenticated }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (authToken, userId) => {
            dispatch(authActions.login(authToken, userId))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
