import './index.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LightButton from 'components/Button/LightButton'
import UnderlineTextInput from 'components/TextInput/UnderlineTextInput'
import request from 'utils/request'

class Profile extends Component {
    state = {
        name: '',
    }

    componentWillMount() {
        request
            .authGet(`/profile/${this.props.userId}/`)
            .then(res => {
                const { name } = res.data
                this.setState({ name })
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateProfile() {
        const { name } = this.state
        request
            .authPatch(`/profile/${this.props.userId}/`, {
                name,
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    onNameChange(value) {
        this.setState({ name: value })
    }

    render() {
        return (
            <div className="profile-page">
                <h1>Profile</h1>
                <UnderlineTextInput
                    width="200px"
                    value={this.state.name}
                    onChange={this.onNameChange.bind(this)}
                    type={'text'}
                    placeholder={'Name'}
                ></UnderlineTextInput>
                <LightButton onClick={this.updateProfile.bind(this)}>Save Changes</LightButton>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { userId: state.authReducer.userId }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
