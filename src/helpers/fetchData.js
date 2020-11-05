export default async ({url, method, token, data, dataType}) => {
    let response;
    const errors = [];
    let headers = token ? {'Authorization': `Bearer ${token}`} : {};
    headers = (dataType === 'form-data') ? headers : {...headers, 'Content-Type': 'application/json'};
    const options = {
        crossDomain: true,
        method,
        headers
    };
    if(method !== 'GET' && method !== 'DELETE') {
        Object.assign(options, {body: data});
    }
    try {
        const res = await fetch(url, options);
        response = await res.json();
    } catch(e) {
        errors.push('Server error. Please try again later.');
    }
    if(!errors.length && response.errors) {
        errors.push(...Object.values(response.errors));
    }
    return {response, errors};
};
