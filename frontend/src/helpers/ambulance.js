import axios from 'axios';

export const getRoutes = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/ambulance_get');
        return response.data;
    } catch (error) {
        console.error('Error fetching routes:', error);
        throw error;
    }
};

export const updateRoute = async (routeFrom, routeTo) => {
    try {
        const response = await axios.post('http://localhost:4000/api/ambulance_post', { routeFrom, routeTo });
        return response.data;
    } catch (error) {
        console.error('Error updating route:', error);
        throw error;
    }
};