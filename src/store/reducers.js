import { combineReducers } from 'redux'
import { authReducer } from 'store/api/auth'

const rootReducer = combineReducers({
    authReducer,
})

export default rootReducer
