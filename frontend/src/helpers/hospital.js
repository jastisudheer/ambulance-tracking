import axios from 'axios';

const hospitalHelper = {
    fetchHospitalData: async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/hospital_get');
            return response.data;
        } catch (error) {
            console.error('Error fetching hospital data:', error);
            return [];
        }
    },

    submitHospitalData: async (selectedHospital, acceptPatient) => {
        try {
            const response = await axios.post('http://localhost:4000/api/hospital_post', {
                hospital_name_hp: selectedHospital,
                accept_patient: acceptPatient
            });
            return response.data;
        } catch (error) {
            console.error('Error submitting hospital data:', error);
            return null;
        }
    }
};

export default hospitalHelper;