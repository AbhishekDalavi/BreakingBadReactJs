import axios from "axios";
import { ApiCallObjModal } from "../shared/InterFaces/InterFaceList";


export const makeRequest = ({method, data, url}:ApiCallObjModal) => {
    const BaseUrl = 'https://www.breakingbadapi.com/api/';
    return new Promise((resolve, reject)=>{
        axios({
            method: method,
            url: `${BaseUrl}${url}`,
            data: data
          })
            .then((response) => {
                resolve(response);
            })
            .catch((error)=>{
                reject(error);
            });
    })
}