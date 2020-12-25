import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { configureStore } from 'store'
import Login from 'containers/Login/Login'
import Profile from 'containers/Profile/Profile'
import Home from 'containers/Home/Home'
import ColorNavBar from 'components/NavBar/ColorNavBar'
import PrivateRoute from 'PrivateRoute'
import axios from 'axios'
import './App.scss'

const store = configureStore()

class App extends Component {
    state = {
        isSideDrawerOpen: false,
        isLoading: true,
        users: [],
    }

    handleSideDrawer = isSideDrawerOpen => {
        this.setState({ isSideDrawerOpen })
    }

    renderComponentWithNav = (props, Component, withSideDrawer) => {
        const { isSideDrawerOpen } = this.state
        return (
            <>
                <ColorNavBar handleSideDrawer={this.handleSideDrawer} withSideDrawer={withSideDrawer} {...props} />
                <div
                    className={
                        'componentContainer ' +
                        (isSideDrawerOpen ? 'sideDrawerOpen ' : ' ') +
                        (withSideDrawer ? 'withSideDrawer ' : ' ')
                    }
                >
                    <Component {...props} />
                </div>
            </>
        )
    }

    addUser = ({ name, position, company }) => {
        this.setState({
            users: [...this.state.users, { name, position, company }],
        })
    }

    render() {
        return (
            <div>
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact
                                path="/login"
                                render={props => this.renderComponentWithNav(props, Login, false)}
                            />
                            <PrivateRoute
                                exact
                                path="/profile"
                                render={props => this.renderComponentWithNav(props, Profile, true)}
                            />
                            <Route exact path="/" render={props => this.renderComponentWithNav(props, Home, true)} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
        )
    }
}

export default App
