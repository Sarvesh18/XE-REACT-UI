import { api } from '@utils';

export const getProductList = (query = '/', data = {}) => {
    const path = `/product${query}`;
    return api('GET', path, data);
} 