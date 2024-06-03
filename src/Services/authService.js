import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const signup = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/signup` , data);
            const token = response.data;
            if( token )
            localStorage.setItem('token' , JSON.stringify(token));
        return response;
    } catch (error) {
        console.error('Error during signup : ',  error);
    }
};

export const signin = async (data , login) => {
    try {
        console.log(data);
        const response = await axios.post(`${API_URL}/signin` , data);
        const token = response.data;
        console.log(token);
        if(token){
            localStorage.setItem('token' , JSON.stringify(token));
            login(token);
        }
        else{
            console.log('error invalid login credientioals');
        }
        console.log('done');
        return response.data;
    } catch (error) {
        alert('wrong username or password');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
}

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    console.log('token ' ,token);
    if(token){
    // console.log('here ' , JSON.parse(localStorage.getItem('token')).data.user);
        // JSON.parse(token);
        const user = token.user || null;
        // console.log(user);
        return user;
    }
    return null;
}