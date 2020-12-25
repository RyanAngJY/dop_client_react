import './index.scss'
import React, { useState, Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authActions } from 'store/api/auth'
import HomeIcon from '@material-ui/icons/Home'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import RoomServiceIcon from '@material-ui/icons/RoomService'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import SearchIcon from '@material-ui/icons/Search'

const NavBarButton = props => {
    return (
        <button className="nav-bar-btn" onClick={props.onClick}>
            {props.children}
        </button>
    )
}

const ToggleSideDrawerButton = props => {
    return (
        <button className="toggle-side-drawer-btn" onClick={props.onClick}>
            {props.children}
        </button>
    )
}

const SideDrawerButton = props => {
    let icon = props.children[0]
    let text = props.children[1]
    return (
        <button
            className={
                'side-drawer-btn ' +
                (props.isSelected ? 'side-drawer-btn-selected' : '')
            }
            onClick={props.onClick}
        >
            {icon}
            <div
                className={
                    'side-drawer-btn-text ' +
                    (props.isSideDrawerOpen ? '' : 'hide-text')
                }
            >
                {text}
            </div>
        </button>
    )
}

const SideDrawer = props => {
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)
    const [selectedButtonId, setSelectedButtonId] = useState(-1)
    return (
        <>
            <div
                className={
                    'side-drawer ' +
                    (isSideDrawerOpen ? 'side-drawer-open' : '')
                }
                // className={'side-drawer side-drawer-open'}
            >
                <ToggleSideDrawerButton
                    onClick={() => {
                        props.handleSideDrawer(!isSideDrawerOpen)
                        setIsSideDrawerOpen(!isSideDrawerOpen)
                    }}
                    isSideDrawerOpen={isSideDrawerOpen}
                >
                    {isSideDrawerOpen ? (
                        <ChevronLeftIcon fontSize="inherit"></ChevronLeftIcon>
                    ) : (
                        <ChevronRightIcon fontSize="inherit"></ChevronRightIcon>
                    )}
                </ToggleSideDrawerButton>
                <div className="side-drawer-btns">
                    <SideDrawerButton
                        isSideDrawerOpen={isSideDrawerOpen}
                        onClick={() => {
                            props.history.push('/')
                            setSelectedButtonId(1)
                        }}
                        isSelected={selectedButtonId === 1}
                    >
                        <HomeIcon fontSize="inherit"></HomeIcon>Home
                    </SideDrawerButton>
                    <SideDrawerButton
                        isSideDrawerOpen={isSideDrawerOpen}
                        onClick={() => {
                            props.history.push('/services')
                            setSelectedButtonId(2)
                        }}
                        isSelected={selectedButtonId === 2}
                    >
                        <RoomServiceIcon fontSize="inherit"></RoomServiceIcon>
                        Services
                    </SideDrawerButton>
                </div>
            </div>
        </>
    )
}

const SearchBar = props => {
    return (
        <div className="nav-bar-search-bar-container">
            <div className="nav-bar-search-bar align-veritcal-center">
                <SearchIcon fontSize="small"></SearchIcon>
                <input placeholder="Search..."></input>
            </div>
        </div>
    )
}

class ColorNavBar extends Component {
    render() {
        console.log(this.props.isAuthenticated)
        return (
            <>
                <div className="color-nav-bar">
                    <NavBarButton
                        onClick={() => {
                            this.props.history.push('/')
                        }}
                    >
                        VIRASPACE
                    </NavBarButton>
                    <div className="align-veritcal-center">
                        <SearchBar></SearchBar>
                        {this.props.isAuthenticated ? (
                            <>
                                <PermIdentityIcon
                                    className="profile-icon"
                                    onClick={() => {
                                        this.props.history.push('/profile')
                                    }}
                                ></PermIdentityIcon>
                                <NavBarButton
                                    onClick={() => {
                                        this.props.logout()
                                        this.props.history.push('/login')
                                    }}
                                >
                                    Logout
                                </NavBarButton>
                            </>
                        ) : (
                            <NavBarButton
                                onClick={() => {
                                    this.props.history.push('/login')
                                }}
                            >
                                Login
                            </NavBarButton>
                        )}
                    </div>
                </div>
                {this.props.withSideDrawer && (
                    <SideDrawer
                        handleSideDrawer={this.props.handleSideDrawer}
                        history={this.props.history}
                    ></SideDrawer>
                )}
            </>
        )
    }
}

ColorNavBar.propTypes = {}

// export default withRouter(ColorNavBar)

const mapStateToProps = state => {
    return { isAuthenticated: state.authReducer.isAuthenticated }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(authActions.logout())
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ColorNavBar))
