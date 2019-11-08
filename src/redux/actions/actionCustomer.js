import * as types from '../types'
import Axios from 'axios';

export const handleGetCustomers = (token) => ({
    type: types.GET_CUSTOMER,
    payload: Axios({
        method : "GET",
        url : "http://hotelpedias-rest-api.herokuapp.com/api/v2/customers",
        headers : {
            Authorization : token
        }
    })
});

export const handleAddCustomer = (name, identityNumber, phoneNumber, image, token) => ({
    type: types.ADD_CUSTOMER,
    payload: Axios({
        method : "POST",
        url : "http://hotelpedias-rest-api.herokuapp.com/api/v2/customers",
        headers : {
            Authorization : token
        },
        data : {
            name: name,
            identity_number : identityNumber,
            phone_number : phoneNumber,
            image: image
        },
    })
});

export const handleUploadImageCustomer = (param) => ({
    type: types.UPLOAD_IMAGE_CUSTOMER,
    payload: Axios({
        method : "POST",
        url : `https://us-central1-hotelpedia-d7bd2.cloudfunctions.net/uploadFile`,
        headers : {
            Authorization : param.token
        },
        data : param.data
    })
});

export const handleEditCustomer = (name, identityNumber, phoneNumber, id, image, token) => ({
    type: types.EDIT_CUSTOMER,
    payload: Axios({
        method : "PATCH",
        url : `http://hotelpedias-rest-api.herokuapp.com/api/v2/customers/${id}`,
        headers : {
            Authorization : token
        },
        data : {
            name: name,
            identity_number : identityNumber,
            phone_number : phoneNumber,
            image: image
        },
    })
});

export const handleDeleteCustomer = (id, token) => ({
    type: types.DELETE_CUSTOMER,
    payload: Axios({
        method : "DELETE",
        url : `http://hotelpedias-rest-api.herokuapp.com/api/v2/customers/${id}`,
        headers : {
            Authorization : token
        },
    })
});

