import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ isAuthenticated, ...otherProps }) => {
    return isAuthenticated ? <Route {...otherProps} /> : <Redirect to="/login" />
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return { isAuthenticated: state.authReducer.isAuthenticated }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
