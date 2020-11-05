import {useContext, useEffect, useState} from 'react';
import fetchData from "../helpers/fetchData";
import {UserAuthContext} from "../contexts/UserAuth";

export default ({initialValue, url, itemType, token}) => {
    const [data, setData] = useState(initialValue);
    const [errors, setErrors] = useState(null);
    const {checkAuthErrors} = useContext(UserAuthContext);
    const fetchingData = async () => {
        const fetchedData = await fetchData({
            method: 'GET',
            url,
            token
        });
        if (fetchedData.errors.length) {
            if(token) {
                checkAuthErrors(fetchedData);
            }
            return setErrors(fetchedData.errors);
        }
        setData(fetchedData.response[itemType]);
    };
    useEffect(() => {
        fetchingData();
    }, []);
    return [data, errors, setData, setErrors];
};
