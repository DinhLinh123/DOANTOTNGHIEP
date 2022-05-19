import axios from 'axios';
import { historyApp } from '../App';

let headers ={
    'Content-Type': 'appliacation/json'
}

const axiosClient = axios.create({
    headers : {...headers},
})

axiosClient.interceptors.response.use(
    (response)=>{
        if(response && response.data){
            return response.data
        }
        return response
    },
    (error)=>{
            switch(error?.response?.status){
                case 404: break;
                default: break;
            }
        throw error
    }
)
export default axiosClient