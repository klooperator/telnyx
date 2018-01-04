/**
 * @overview fetch actions related to post comments
 */
import Constants from './Constants';

const {host, port, endpoint} = Constants;

export const getPostCommnets = id =>{

    return fetch(`${host}${port}${endpoint}/${id}/comments`)
    .then(res=>{
        if(res.ok || res.status === 200)return res.json();
    })
    .then(j=>{
        return j;
    })
    .catch(e=>{
        console.error(e);
    })
}

export const addNewComment = (id,data) =>{
    return fetch(`${host}${port}${endpoint}/${id}/comments`,{
        method:'post',
        body:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(res=>{
        if(res.ok && res.status === 201)return res.json();
        else throw 'something';
    })
    .then(j=>{
        return j;
    })
    .catch(e=>{
        console.error(e);
    })
}