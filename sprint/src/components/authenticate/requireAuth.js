import React from 'react';
import axios from 'axios';

//tell axios where to find the API 

axios.defaults.baseURL = 'http://localhost:3300/api';

//interceptors can execute code before a request happens or when a response comes in 
axios.interceptors.request.use(
    function(options) {
    //this function has access to the request options passed to axios 
    //if we do axios.get('/api, reqOptions)
    //axios will pass reqOPtions object as the first arg to this function 
    //read the token from localStorage and attach it to the request as the auth header
    //now any component rendered by this HOC will attach the token auto 
    options.headers.authorization = localStorage.getItem('jwt');
    return options; //must return modified options back to axios 
}, 

function(error) {
    //do something with the error
    return Promise.reject(error);
    }
);

export default function(Component) {
    return class Authenticated extends React.Component {
        render() {
            const token = localStorage.getItem('jwt');
     //if there is no token, then show a message to user 
            const notLoggedIn = <div>Please login to see the users</div>
            return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
       
        }
    }
}