/**
 * @overview fetch actions related to posts
 */
import Constants from './Constants';

const {host, port, endpoint} = Constants;

const getAllPosts = () =>{
    /* Idealy we should check if fetch exists, or use fetch polyfill */
    return fetch(`${host}${port}${endpoint}`)
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
export default getAllPosts;

export const getPostById = id =>{

    return fetch(`${host}${port}${endpoint}/${id}`)
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