import './index.scss'
import React, { useState, memo } from 'react'
import LightButton from 'components/Button/LightButton'
import UnderlineTextInput from 'components/TextInput/UnderlineTextInput'

const LoginForm = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="login-form">
            <h1>Login</h1>
            <UnderlineTextInput
                width="100%"
                value={username}
                onChange={setUsername}
                type={'text'}
                placeholder={'Username'}
            ></UnderlineTextInput>
            <UnderlineTextInput
                width="100%"
                value={password}
                onChange={setPassword}
                type={'password'}
                placeholder={'Password'}
            ></UnderlineTextInput>
            <LightButton onClick={props.login}>Login</LightButton>
        </div>
    )
}

LoginForm.propTypes = {}

export default memo(LoginForm)
