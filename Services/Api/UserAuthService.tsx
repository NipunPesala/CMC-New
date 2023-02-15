import { baseUrl } from '../../Constant/ApiConstants';
import httpService from './httpService';

export function userLogin(params:any) {

    const endPoint = `${baseUrl}Auth/login`;
    return httpService.post(endPoint, params);
}

export function getCustomers(Token:any) {
    const endPoint = baseUrl + 'customers';
    return httpService.get(endPoint, Token);
    
}



