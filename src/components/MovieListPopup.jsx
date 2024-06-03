import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieListPopup = ({ onClose , position, movieID , val }) => {
    const [movieLists, setMovieLists] = useState([{movieId : '' , title:'' , year:''}]);
    const [newListName, setNewListName] = useState('');
    const [newListPrivacy, setNewListPrivacy] = useState('public');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const token = localStorage.getItem('token');
    useEffect(() => {
        axios.get('http://localhost:5000/api/movies/special-list' , {
            headers : {
                'Authorization' : `Bearer ${token}`,
            }
        })
            .then(response => {
                setMovieLists(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the movie lists!', error);
            });
    }, []);

    const handleCreateList = (e) => {
        e.stopPropagation();
        const newList = { movieID , name: newListName, privacy: newListPrivacy , movieLists };
        axios.post('http://localhost:5000/api/movies/add-to-special-list', newList , {
            headers : {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                setMovieLists([...movieLists, response.data]);
                setNewListName('');
                setNewListPrivacy('public');
                setShowCreateForm(false);
                setMovieLists([{movieID:'' , title:'' , year:''}]);
            })
            .catch(error => {
                console.error('There was an error creating the movie list!', error);
            });
    };

    const onCloseit = () => {
        console.log('val' , val);
        val.length = 0;
        console.log('object');
        console.log('val' , val);
    }

    return (
        <div className="popup" style={{ zIndex :'999' }}>
            <div className="popup-inner">
                <button className="close-btn" onClick={onCloseit}>X</button>
                <h6>My Movie Lists</h6>
                {/* <ul>
                    {movieLists.map((list, index) => (
                        <li key={index}>{list.name} ({list.privacy})</li>
                    ))}
                </ul> */}
                {/* {console.log(movieLists)} */}
                <button onClick={() => setShowCreateForm(true)}>Create a New List </button>
                {showCreateForm && (
                    <div className="create-form">
                        {/* <h6>Create a New List</h6> */}
                        <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="List Name"
                        />
                        <select
                            value={newListPrivacy}
                            onChange={(e) => setNewListPrivacy(e.target.value)}
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                        <button onClick={handleCreateList}>Create</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieListPopup;
