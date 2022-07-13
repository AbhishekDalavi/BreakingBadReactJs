import React from "react";
import axios from "axios";

export const makeRequest = ({method, data, url}) => {
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