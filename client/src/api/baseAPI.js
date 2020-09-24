import axios from 'axios';

/* ====================================
 * Exports a custom axios instance
 * ====================================
 */

const baseAPI = axios.create({
  // TODO: use environment variables
  baseURL: 'http://localhost:8000/api',
});

// TODO: error handling
baseAPI.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

baseAPI.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(
        `[API] ${response.status} ${response.config?.method.toUpperCase()} ${
          response.request.responseURL
        }`,
      );
    }
    return response.data; // ignore other attributes (TODO: decide if this should be elsewhere)
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default baseAPI;
