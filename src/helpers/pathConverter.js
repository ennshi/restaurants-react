import {URL_BASE} from '../constants/urls';

export default (url) => {
    const partUrl = url.split('/').slice(2, 4).join('/');
    return `${URL_BASE}/${partUrl}`;
};
