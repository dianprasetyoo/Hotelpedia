import * as types from '../types'
import Axios from 'axios';
import { Header } from 'react-native/Libraries/NewAppScreen';

// export const handleGetCheckin = () => ({
//     type: types.GET_CHECKIN,
//     payload: Axios.get('http://192.168.0.23:5000/api/v2/checkin')
// });

export const handleGetCheckin = (token) => ({
    type: types.GET_CHECKIN,
    payload: Axios({
        method : "GET",
        url : "http://hotelpedias-rest-api.herokuapp.com/api/v2/checkin",
        // url : "http://hotelpedias-rest-api.herokuapp.com/api/v2/checkin",
        headers : {
            Authorization : token
        }
    }),
});

export const handleAddCheckin = (idRoom, idCustomer, duration, order_end_time, is_booked, is_done, token) => ({
    type: types.ADD_CHECKIN,
    payload: Axios({
        method : "POST",
        url : "http://hotelpedias-rest-api.herokuapp.com/api/v2/orders",
        headers : {
            Authorization : token
        },
        data : {
            customer_id: idCustomer,
            room_id: idRoom,
            duration: duration,
            is_booked: is_booked,
            is_done: is_done,
            order_end_time: order_end_time

        },
    }),
});

export const handleCheckout = (orderId, token) => ({
    type: types.CHECKOUT,
    payload: Axios({
        method : "DELETE",
        url : `http://hotelpedias-rest-api.herokuapp.com/api/v2/orders/${orderId}`,
        headers : {
            Authorization : token
        }
    }),
});