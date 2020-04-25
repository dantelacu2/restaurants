import axios from 'axios'

// var port = process.env.PORT || 'dev'
// var url = ''
// if (port == 'dev') {url = 'http://localhost:3000/api'}
    var url = 'https://marinrestaurants.herokuapp.com/api';

const api = axios.create({
    baseURL: url,
})

export const insertRestaurant = payload => api.post(`/restaurant`, payload)
export const getAllRestaurants = () => api.get(`/restaurants`)
export const updateRestaurantById = (id, payload) => api.put(`/restaurant/${id}`, payload)
export const deleteRestaurantById = id => api.delete(`/restaurant/${id}`)
export const getRestaurantById = id => api.get(`/restaurant/${id}`)

export const getStats = () => api.get('/countyStats')

const apis = {
    insertRestaurant,
    getAllRestaurants,
    updateRestaurantById,
    deleteRestaurantById,
    getRestaurantById,
    getStats,
}

export default apis
