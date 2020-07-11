import axios from 'axios'
import cookie from 'react-cookies' 

const BASEURL = "https://reqres.in"

export const isloggedIn = () => {
    const token = cookie.load('token')
    if(token === undefined || token === ''){
        return false
    }else{
        return true
    }
}

export const login = (data) => {
    return axios.post(`${BASEURL}/api/login`, data)
    .then(res=>{
        cookie.save('token', res.data.token, { path: '/' })
        return { status: true, data: res.data }
    })
    .catch((err) => {
        return { status: false, msg : err.response.data.error }
    })
}


export const getAllUser = (page) => {
    return axios.get(`${BASEURL}/api/users?page=${page}`)
    .then(res=>{
        return { status: true, data: res.data }
    })
    .catch((err) => { 
        return { status: false, msg : err.response.data.error }
    })
}

export const getUser = (id) => {
    return axios.get(`${BASEURL}/api/users/${id}`)
    .then(res=>{
        return { status: true, data: res.data }
    })
    .catch((err) => { 
        return { status: false, msg : err.response.data.error }
    })
}