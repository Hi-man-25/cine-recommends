
import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';



const useStyles = makeStyles(() => ({
  appBar: {
    // backgroundColor: theme.palette.primary.main,
    backgroundColor:'black',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    margin:'0',
    padding:'0',
    height :'80vh',
    width :'100vw',
    overflow:'hidden',
  },
  carousel : {
    margin : 0,
    padding : 0,
    position:'relative',
  },
  backgroundImage: {
    position: 'relative',
    width: '100vw', 
    height: '80vh', 
    backgroundSize: 'fill',
    backgroundPosition: 'center',
  },
  cardContent: {
    position: 'relative',
    left: 0,
    color: 'white',
    zIndex: 1,
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  // const { isAuthenticated  } = useContext(AuthContext);

  const latestMovies = [
    { id: 1, title: 'Batman', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrF-lfD3dy0Jsz8CTD_-i25pwqbcgDqUWQ6g&s', description: 'Robert Pattinson, Zoë Kravitz, Jeffrey Wright' },
    { id: 2, title: 'Her', imageUrl: 'https://images.squarespace-cdn.com/content/v1/5cf6959864dfad0001763314/1568017206611-7M82X7SXHZPE83E98VKG/Top_15_Movie_Posters_Her.jpg', description: 'Joaquin Phoenix, Amy Adams, Scarlett Johansson' },
    { id: 3, title: 'Deewaar', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvKST--_dT8k7hPz2R8eZzIfRUBnMT9sOpMg&s', description: 'Amitabh Bachchan, Shashi Kapoor, Nirupa Roy' },
  ];

  return (
    <Container className={classes.content} maxWidth={false}>
      <Carousel className={classes.carousel} navButtonsAlwaysVisible>
        {latestMovies.map(movie => (
          <Box
            key={movie.id}
            className={classes.backgroundImage}
            style={{ backgroundImage: `url(${movie.imageUrl})` }}
          >
            <Box className={classes.cardContent}>
              <Typography variant="h4" component="h2">{movie.title}</Typography>
              <Typography variant="body1" component="p">{movie.description}</Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
};

export default LandingPage;

