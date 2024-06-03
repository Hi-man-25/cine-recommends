import React, { useState, useEffect } from 'react';
import api from '../api';

function SpecialList() {
  const [specialList, setSpecialList] = useState([]);

  useEffect(() => {
    const fetchSpecialList = async () => {
      try {
        const response = await api.get('/movies/special-list');
        setSpecialList(response.data);
      } catch (error) {
        alert('Error fetching special list');
      }
    };

    fetchSpecialList();
  }, []);

  return (
    <div>
      <h2>Special List</h2>
      <div>
        {specialList.map(movie => (
          <div key={movie.movieId}>
            <h3>{movie.title}</h3>
            <p>Year: {movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpecialList;
