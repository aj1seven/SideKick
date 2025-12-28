import axios from 'axios';

const API_URL = 'http://localhost:8000/chat';

export const sendMessage = async (message, history, successCriteria = '') => {
    try {
        const response = await axios.post(API_URL, {
            message,
            success_criteria: successCriteria,
            history,
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
