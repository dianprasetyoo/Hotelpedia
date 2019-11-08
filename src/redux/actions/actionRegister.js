import Axios from 'axios'

import * as types from '../types'

export const handleRegister = (username, password) => ({
    type : types.REGISTER,
    payload: Axios({
        method : 'POST',
        url : 'http://hotelpedias-rest-api.herokuapp.com/api/v2/register',
      data: { 
          username : username ,
          password : password,
        }
    })
})