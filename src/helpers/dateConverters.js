const dateConverter = (dateStr) => {
    const dateObj = new Date(dateStr);
    return (`${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`);
};

module.exports = {dateConverter};
