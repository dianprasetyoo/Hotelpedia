import Axios from 'axios'

import * as types from '../types'

export const handleActionLogin = (username, password) => ({
    type : types.LOGIN,
    payload: Axios({
        method : 'POST',
        url : 'http://hotelpedias-rest-api.herokuapp.com/api/v2/login',
      data: { 
          username : "dianprasetyo" ,
          password : "admin",
        }
    })
})