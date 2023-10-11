import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SERVER = axios.create({
    baseURL: ''
});

SERVER.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('__token__');

        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)