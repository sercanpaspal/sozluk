import axios from 'axios'
import Echo from 'laravel-echo'
const io = require('socket.io-client')

export const echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname,
  client: io,
})

const API_URL = '/api' //process.env.MIX_API_URL

const access_token = localStorage.getItem('access_token')

if (access_token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
}

axios.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data
    }

    return response
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error.response.data)
    } else if (error.request) {
      return Promise.reject(error.request)
    } else {
      return Promise.reject(error)
    }
  },
)

const post = (endpoint, data) => axios.post(API_URL + endpoint, data)

const put = (endpoint, data) => axios.put(API_URL + endpoint, data)

const del = (endpoint, data) => axios.delete(API_URL + endpoint, data)

const get = (endpoint) => axios.get(API_URL + endpoint)

const Auth = {
  me: () => post('/auth/me'),
  login: (data) => post('/auth/login', data),
  register: (data) => post('/auth/register', data),
}

const User = {
  show: (username) => get(`/user/${username}`),
  follow: (username) => post(`/user/${username}/follow`),
  followers: (username, page = 1) =>
    get(`/user/${username}/followers?page=${page}`),
  followeds: (username, page = 1) =>
    get(`/user/${username}/followeds?page=${page}`),
}

const Topic = {
  all: () => get('/topic'),
  show: (slug) => get(`/topic/${slug}`),
  entries: (slug, page = 1) => get(`/topic/${slug}/entries?page=${page}`),
  store: (data) => post('/topic', data),
  search: (query) => get(`/topic/${query}/search`),
  get: (type, page = 1) => get(`/topic/${type}/get?page=${page}`),
}

const Entry = {
  store: (data) => post('/entry', data),
  update: (id, data) => put(`/entry/${id}`, data),
  destroy: (id) => del(`/entry/${id}`),
}

const Like = {
  toggle: (data) => post('/like/toggle', data),
}

const Complaint = {
  store: (data) => post('/complaint', data),
}

const ComplaintSubject = {
  options: () => get('/complaint-subject/options'),
}

export default { Auth, User, Topic, Entry, Like, Complaint, ComplaintSubject }
