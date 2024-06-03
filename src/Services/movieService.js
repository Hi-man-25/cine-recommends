import axios from 'axios';

const API_URL = 'http://localhost:5000/api/movie';

export const addmovie = async (movieID , updatedFavorites ) => {
    // console.log('response' , data);
    const response = await axios.post(`${API_URL}/add-to-special-list` , movieID , updatedFavorites[movieID]);
    console.log('response',response);
    if(response.data.token){
        localStorage.setItem('user' , JSON.stringify(response.data));
    }
    console.log(response.status);
    return response;
};