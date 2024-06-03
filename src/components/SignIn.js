import React, { useState  ,  useContext } from 'react';
import { signin } from '../Services/authService.js';
import { Container, TextField, Button, Typography, Link, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AuthContext } from '../AuthContext.js';

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

const SignIn = () => {
    const { login } = useContext(AuthContext);
    const classes = useStyles();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e,error) => {
        e.preventDefault();
        try {
            const res = await signin(formData , login);
            if(res === undefined) {console.log('res.status' , res.status);  throw error;}
            if(res.status === 'success'){
                window.location.href = '/';
            }
        } catch (err) {
            console.error('herer' , err);
        }
    };


    return (
        <div className={classes.root}>
      <Container maxWidth="xs" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={onSubmit}>
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
            Sign In
          </Button>
        </form>
        <Link href="/signup" variant="body2" className={classes.link}>
          New user?
        </Link>
      </Container>
    </div>
    );
};

export default SignIn;
