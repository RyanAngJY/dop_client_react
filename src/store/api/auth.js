import actions from '../actionTypes'

const initialState = {
    isAuthenticated: false,
    userId: null,
}

export const authActions = {
    login: (authToken, userId) => {
        return {
            type: actions.LOGIN,
            payload: {
                authToken,
                userId,
            },
        }
    },
    logout: () => {
        return {
            type: actions.LOGOUT,
            payload: {},
        }
    },
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN:
            localStorage.setItem('authToken', action.payload.authToken)
            return {
                ...state,
                isAuthenticated: true,
                userId: action.payload.userId,
            }
        case actions.LOGOUT:
            localStorage.removeItem('authToken')
            return {
                ...state,
                isAuthenticated: false,
                userId: null,
            }
        default:
            return state
    }
}
