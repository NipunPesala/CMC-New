import { baseUrl } from '../../Constant/ApiConstants';
import httpService from './httpService';

export function userLogin(params) {

    const endPoint = `${baseUrl}Auth/login`;
    return httpService.post(endPoint, params);
}



