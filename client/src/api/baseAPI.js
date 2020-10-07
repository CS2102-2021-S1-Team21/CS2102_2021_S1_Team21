import axios from 'axios';

/* ====================================
 * Exports a custom axios instance
 * ====================================
 */

const baseAPI = axios.create({
  // TODO: use environment variables
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // to allow cookies
  validateStatus: (status) => status >= 200 && status < 500, // allow status codes 400+ to be received by application
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
    return { ...response.data, status: response.status }; // ignore other attributes
    // TODO: manually handle error status codes (show message) then throw error (instead of returning it as a response)
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default baseAPI;
