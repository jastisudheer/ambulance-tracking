import axios from 'axios';

const trafficHelper = {
    fetchTrafficData: async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/traffic_get');
            return response.data;
        } catch (error) {
            console.error('Error fetching Traffic data:', error);
            return [];
        }
    },

    submitTrafficData: async (selectedSignal, signalStatus) => {
        try {
            const response = await axios.post('http://localhost:4000/api/traffic_post', {
                traffic_name_tp: selectedSignal,
                Signal_Status: signalStatus
            });
            return response.data;
        } catch (error) {
            console.error('Error submitting Traffic data:', error);
            return null;
        }
    }
};

export default trafficHelper;