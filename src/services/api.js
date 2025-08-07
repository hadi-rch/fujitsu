import axios from 'axios';

// const API_URL = 'https://worldtimeapi.org/api/ip';
const API_URL = 'https://wttr.in/Malang?format=j1';

export const fetchTimeData = () => {
    return axios.get(API_URL);
};