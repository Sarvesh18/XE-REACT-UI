import { HOME_API_LOADING, HOME_API_SUCCESS, HOME_API_FAILURE, HOME_API_RESET } from './Home.constant';

import { getProductList } from './Home.service';

export const getProductData = (skip, limit, category, rating) => (dispatch, getState) => {

    let query = `?limit=${limit}`;

    if(category) {
        query +=`&category=${category}`;
    }
    if(rating) {
        query +=`&rating=${rating}`;    
    }

    dispatch({
        type: HOME_API_LOADING
    });
    
    return getProductList(query)
        .then(data => {
            dispatch({
                type: HOME_API_SUCCESS,
                skip,
                data: data
            })
        })
        .catch(error => {
            dispatch({
                type: HOME_API_FAILURE,
                error: error.message
            })
        });
};