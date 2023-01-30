import { baseUrl } from '../../Constant/ApiConstants';
import httpService from './httpService';

export function userLogin(params) {

    const endPoint = baseUrl + 'Authinticate/login';
    return httpService.post(endPoint, params);
    return Promise.reject(new Error('Invalid User'));
}



