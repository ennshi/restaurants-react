const convertUrl = url => {
    const partUrl = url.split('/').slice(2, 4).join('/');
    return `http://localhost:8080/${partUrl}`;
};

module.exports = {convertUrl};
