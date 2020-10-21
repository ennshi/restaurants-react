export const formNormalization = (values) => {
    const normalizedValues = {...values};
    if(normalizedValues.email) {
        normalizedValues.email = normalizedValues.email.trim().toLowerCase();
    }
    if(normalizedValues.username) {
        normalizedValues.username = normalizedValues.username.trim();
    }
    return normalizedValues;
};
