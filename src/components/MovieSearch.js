import React, {  useState , useRef } from 'react';
import api from '../api';
import {Box, Grid , Typography , AppBar , Toolbar , TextField , createTheme , Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {IconButton} from '@mui/material';
import { getCurrentUser } from '../Services/authService';
import { addmovie } from '../Services/movieService.js';
import MovieListPopup from './MovieListPopup.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#1976d2', 
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    margin :'0px',
    padding : '0px',
    height: '100%',
    backgroundColor: 'black',
    color: 'white',
  },
  appBar: {
    backgroundColor: '#333',
  },
  searchInput: {
    // color:'white',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  movieContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
  },
  movieItem: {
    textAlign: 'center',
    margin: theme.spacing(2),
    width: 200,
  },
  movieImage: {
    width: '100%',
    height: 'auto',
    borderRadius: 4,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  movieTitle: {
    marginTop: theme.spacing(1),
  },
}));

let showPopup = [];

function MovieSearch() {
  const classes = useStyles();
  const user = getCurrentUser();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState({});
  // const [showPopup, setShowPopup] = useState([]);
  const [popupPosition, setPopupPosition] = useState({ id:'' ,  top: 0, left: 0 });
  const refs = useRef({});
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/movies/search?query=${query}`);
      setResults(response.data.Search || []);
      setSelectedMovie(null);
    } catch (error) {
      alert('Error searching for movies');
    }
  };

  const fetchMovieDetails = async (movieId , navigate) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          });
          const movie = response.data;
          console.log('response' , movie);
        // Navigate to the movie details page with the movie ID
        navigate(`/movies/${movieId}`, { state: { movie } });
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};
  const addtofav = async (e) => {
    try {
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [e]: !prevFavorites[e]
      }));
      const updatedFavorites = { ...favorites, [e]: !favorites[e] };
      const res = await addmovie(e , updatedFavorites);
      console.log('res',res);
    } catch (error) {
      console.error('error' , error.message);
    }    
  };

  const handleHeartClick = (movieID) => {
    // console.log('button' , refs.current[movieID].current);
    const buttonRef = refs.current[movieID];
    if(buttonRef && buttonRef.current){
      // console.log('here ')
      const buttonRect = buttonRef.current;
      setPopupPosition({
          id : movieID,
          top: buttonRect.top + window.scrollY - 10,
          left: buttonRect.left + window.scrollX-10,
      });
    }
    const indexToRemove = showPopup.indexOf(movieID);
    if(indexToRemove === -1){
      // showPopup.splice(indexToRemove , 1);
      showPopup = [...showPopup , `${movieID}`];
    }
    console.log('showpopup',showPopup);
  }
  const getRefForMovieId = ( movieId) => {
    if (!refs.current[movieId]) {
        refs.current[movieId] = React.createRef();
    }
    return refs.current[movieId];
};

  const handleClosePopup = (id ) => {
    const indexToRemove = showPopup.indexOf(id);
    if(indexToRemove !== -1){
      showPopup.splice(indexToRemove , 1);
    }
  }

  const handleViewDetails = (movieId) => {
    fetchMovieDetails(movieId, navigate);
};


  return (
    <div className={classes.root}>
      <h2 style={{color : 'red'}}>Search Movies</h2>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <TextField
            variant="outlined"
            placeholder="Search Movies"
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className={classes.searchInput}
            style = {{color : 'white'}}
          />
        </Toolbar>
        <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
      </AppBar>
      <div>
        {results.map(movie => (
          <Box key={movie.imdbID} sx={{
            flex: '0 0 auto',
            display:'inline-block',
            marginLeft:'8px',
            marginRight:'1px',
            width: 190,
            textAlign: 'center',
            mx: 1,
            border:'2px solid black',
            backgroundColor : 'pink',
          }}
          >
            <h3 style={{color:'black', backgroundColor:'pink'  , border:'2px solid black' , borderRadius:'5px'}}> {movie.Title} <p>Year: {movie.Year}</p></h3>
            {/* <p>Year: {movie.Year}</p> */}
            <img src={movie.Poster} alt={movie.Title} style={{
                width: '70%',
                height: '20%',
                borderRadius: 4,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }} />
            <Button onClick={() => handleViewDetails(movie.imdbID)} style = {{color:'black', border : '2px solid black'}}>View Details</Button>


              <IconButton key = {movie.imdbID} ref = {getRefForMovieId(movie.imdbID)} onClick={() => user ? handleHeartClick(movie.imdbID) : alert('first Signup/SignIn')} >
                {showPopup.indexOf(movie.imdbID) >= 0  && <MovieListPopup onClose = {handleClosePopup(movie.imdbID)} position={popupPosition} ID = {movie.imdbID} val = {showPopup}/>}
              <FavoriteBorderIcon style={{ color: favorites[movie.imdbID] ? 'red' : 'white'  }} />
            </IconButton>


          </Box>
        ))}
      </div>
      {selectedMovie && (
        <Grid item key={selectedMovie.imdbID} xs={12} sm={6} md={4} lg={3}>
        <div style={{ textAlign: 'center' }}>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} style={{ width: '4%', height: '4%' }} />
          <Typography variant="subtitle1">{selectedMovie.Title}</Typography>
          <Typography variant="subtitle2">{selectedMovie.Year}</Typography>
        </div>
      </Grid>
      )}
    </div>
  );
}

export default MovieSearch;
