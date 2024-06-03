
import React from 'react';
import { Typography, Card } from '@mui/material';
import { useLocation } from 'react-router-dom';

const MovieDetails = () => {
    const location = useLocation();
    const {movie} = location.state;
  const { Title, Poster, Plot, Actors, Director } = movie;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div
        style={{
          position: 'relative',
          top: '20px',
          left: 0,
          width: '20vw',
          height: '60vh',
          background: `url(${Poster}) no-repeat center `,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
        <Card style={{ display : 'relative' , maxWidth: '400px', margin: '0 auto', marginBottom: '20px', background:'none'}}>
          {/* <CardContent> */}
            <Typography variant="h5" gutterBottom>
              {Title}
            </Typography>
            <Typography variant="body1" paragraph>
              {Plot}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Actors:</strong> {Actors}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Director:</strong> {Director}
            </Typography>
          {/* </CardContent> */}
        </Card>
      </div>
    </div>
  );
};

export default MovieDetails;

