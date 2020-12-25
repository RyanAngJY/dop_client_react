import axios from 'axios'

const REACT_APP_BACKEND_BASE_URL =
    process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:3000/api'

// if (!REACT_APP_BACKEND_BASE_URL) {
//     throw new Error(
//         'REACT_APP_BACKEND_BASE_URL environment variable not provided!'
//     )
// }

axios.defaults.baseURL = REACT_APP_BACKEND_BASE_URL
axios.defaults.timeout = 10000
