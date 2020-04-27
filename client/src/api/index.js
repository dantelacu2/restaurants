import axios from 'axios'

// changes api url's depending on environment
let url = '';
if (process.env.NODE_ENV !== "production") url = 'http://localhost:8081/api' ;
else url = 'https://marinrestaurants.herokuapp.com/api';

const api = axios.create({
    baseURL: url,
})

const pythonApi = axios.create({
    baseURL: 'http://localhost:8081/admin'
})
// restaurant info apis
export const insertRestaurant = payload => api.post(`/restaurant`, payload)
export const getAllRestaurants = () => api.get(`/restaurants`)
export const updateRestaurantById = (id, payload) => api.put(`/restaurant/${id}`, payload)
export const deleteRestaurantById = id => api.delete(`/restaurant/${id}`)
export const getRestaurantById = id => api.get(`/restaurant/${id}`)
// api for getting statistics
export const getStats = () => api.get(`/countyStats`)

//
export const massAdd = () => pythonApi.get(`/profile`)
export const massStatusUpdate = () => pythonApi.get(`/statusUpdate`);

const apis = {
    insertRestaurant,
    getAllRestaurants,
    updateRestaurantById,
    deleteRestaurantById,
    getRestaurantById,
    getStats,
    massAdd,
    massStatusUpdate,
}

export default apis
