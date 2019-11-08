import * as types from '../types'
import Axios from 'axios';
import { Header } from 'react-native/Libraries/NewAppScreen';

export const handleGetRooms = (token) => ({
    type: types.GET_ROOMS,
    payload: Axios({
        method : "GET",
        url : "http://hotelpedias-rest-api.herokuapp.com/api/v2/rooms",
        headers : {
            Authorization : token
        }
    }),
});

export const handleAddRooms = (name, token) => ({
    type: types.ADD_ROOMS,
    payload: Axios({
        method : "POST",
        url : "http://hotelpedias-rest-api.herokuapp.com/api/v2/rooms",
        headers : {
            Authorization : token
        },
        data : {
            name: name
        },
    }),
});

export const handleEditRooms = (name, id, token) => ({
    type: types.EDIT_ROOMS,
    payload: Axios({
        method : "PATCH",
        url : `http://hotelpedias-rest-api.herokuapp.com/api/v2/rooms/${id}`,
        headers : {
            Authorization : token
        },
        data : {
            name: name
        },
    }),
});

export const handleDeleteRooms = (id, token) => ({
    type: types.DELETE_ROOMS,
    payload: Axios({
        method : "DELETE",
        url : `http://hotelpedias-rest-api.herokuapp.com/api/v2/rooms/${id}`,
        headers : {
            Authorization : token
        },
    }),
});

// console.log(handleGetDetailWebtoons)
// console.log(handleGetFavorites)