export default async (url, options) => {
    let response;
    const errors = [];
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
