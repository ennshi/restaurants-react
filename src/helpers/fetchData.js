export default async (url, options) => {
    let response;
    let error;
    try {
        const res = await fetch(url, options);
        response = await res.json();
    } catch(e) {
        error = e;
    }
    return {response, error};
};
