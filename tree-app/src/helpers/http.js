import axios from 'axios';

export async function get(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } 
    catch (error) {
        console.error(error);
    }
}