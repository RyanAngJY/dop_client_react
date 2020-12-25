import axios from 'axios'

const request = {
    get: url => {
        return axios.get(url)
    },
    post: (url, data) => {
        return axios.post(url, data)
    },
    authGet: url => {
        return axios.get(url, {
            headers: {
                Authorization: `Token ${localStorage.getItem('authToken')}`,
            },
        })
    },
    authPost: (url, data) => {
        return axios.post(url, data, {
            headers: {
                Authorization: `Token ${localStorage.getItem('authToken')}`,
            },
        })
    },
    authPatch: (url, data) => {
        return axios.patch(url, data, {
            headers: {
                Authorization: `Token ${localStorage.getItem('authToken')}`,
            },
        })
    },
}

export default request
