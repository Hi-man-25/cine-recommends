import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { createTheme} from '@mui/material/styles';
import { AuthContext } from '../AuthContext.js';
import axios from 'axios';
import { getCurrentUser , logout } from '../Services/authService.js';

const theme = createTheme({
    palette: {
      primary: {
        main: '#007bff', 
      },
    },
    spacing: 8, 
  });

  const useStyles = makeStyles(() => ({
    appBar: {
      backgroundColor: theme.palette.primary.main,
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    content: {
      marginTop: theme.spacing(8),
    },
    carousel: {
      marginBottom: theme.spacing(4),
    },
    card: {
      width : '1000px',
      height: '1000px', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '8px',
      boxShadow: theme.shadows[5], 
    },
  }));

function Header() {
    const user = getCurrentUser();
    // const { is}
    // console.log(user);
    const {   login  } = useContext(AuthContext);
    const classes = useStyles();
    // const history = useHistory();

    const navigationLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Movies', path: '/movies' },
      ];

      const handleLogin =   () =>{
        try {
            // const res = await axios.post('http://localhost:5000/api/auth/signin',{data});
            const authToken = user;
            console.log(user);
            console.log(authToken);
            if(authToken === null){
              //  console.log(authToken);
              //   login(authToken);
              console.log('here');
              window.location = '/signin';
            }
            else{
                console.log('Invalid login credientials');
            }
        } catch (error) {
            console.log('error loggin in' , error);

        }
          // window.location = '/signin';
      }

      const handleSignin =  () => {
      //   try {
          // const res = await axios.post('http://localhost:5000/api/auth/signup',{data});
          // const authToken = user;

          // if(authToken ){
          //     login(authToken);
          // }
      // } catch (error) {
      //     console.log('error sign in' , error);
      // }
      window.location = '/signup';
      }

      const handleLogout = () => {
        logout();
        window.location = '/';
      }
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h4'>Welcome ,   {user  ? user.username : 'Guest'}</Typography>
          <Typography variant="h6">Cine Shares</Typography>
          <div>
            {navigationLinks.map(link => (
              <Button  key={link.label} color="inherit" href={link.path}>{link.label}</Button>
            ))}
            {
              user ? <Button onClick={handleLogout} key = 'logout' color = "inherit" href = '/'>Logout</Button> : (
                 <div>
                  <Button onClick={handleLogin} key = 'Sign In' color = "inherit" href = '/signin' >sign in </Button>
                  <Button onClick = {handleSignin} key = 'Sign Up' color = "inherit" href = '/signup' >sign Up </Button>
                 </div>
              )
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
