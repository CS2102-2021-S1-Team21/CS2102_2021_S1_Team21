import Cookies from 'js-cookie';

const COOKIE_NAME = 'connect.sid'; // express session default

export const setSessionCookie = (value) => Cookies.set(COOKIE_NAME, value);

export const getSessionCookie = () => Cookies.get(COOKIE_NAME);

export const removeSessionCookie = () => Cookies.remove(COOKIE_NAME);
