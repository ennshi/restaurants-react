const strToDate = (dateStr) => (new Date(dateStr));

const strToDDMMYYYY = (dateStr) => {
    const dateObj = strToDate(dateStr);
    return (`${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`);
};

module.exports = {strToDDMMYYYY, strToDate};
