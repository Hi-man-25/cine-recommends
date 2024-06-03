import React, { useState } from 'react';
import { signup } from '../Services/authService.js';
import { Container, TextField, Button, Typography, Link, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';


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
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  link: {
    marginTop: theme.spacing(2),
  },
}));

const SignUp = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
     
    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();  
        try {
            const res = await signup(formData);
            if(res.status === 201){
            window.location.href = '/';
            }
        } catch (err) {
            console.error('Signup failed:', err.message);
        }
    };

    return (
        <div className={classes.root}>
      <Container maxWidth="xs" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="Username"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Enter your username"
            variant="outlined"
            fullWidth
            className={classes.textField}
          />
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            variant="outlined"
            fullWidth
            className={classes.textField}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your password"
            variant="outlined"
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Sign Up
          </Button>
        </form>
        <Link href="/signin" variant="body2" className={classes.link}>
          Already a user?
        </Link>
      </Container>
    </div>
    );
};

export default SignUp;