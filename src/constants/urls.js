const DEV_URL_BASE = 'http://localhost:8080';
const URL_BASE = DEV_URL_BASE;
const USER_PROFILE_URL = `${URL_BASE}/profile`;
const RESTAURANT_URL = `${URL_BASE}/restaurant`;
const REVIEWS_URL = `${URL_BASE}/reviews`;
const USER_LOGIN_URL = `${URL_BASE}/auth/login`;
const USER_AVATAR_URL = `${USER_PROFILE_URL}/avatar`;

module.exports = {
    URL_BASE,
    USER_PROFILE_URL,
    RESTAURANT_URL,
    REVIEWS_URL,
    USER_LOGIN_URL,
    USER_AVATAR_URL
};
