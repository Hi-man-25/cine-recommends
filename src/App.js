import React, { useContext , useLocation } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import LandingPage from './components/LandingPage.jsx';
import MovieSearch from './components/MovieSearch.js';
import SpecialList from './components/SpecialList.js';
import Profile from './components/Profile.jsx';
import Header from './components/Header.jsx'
import { AuthContext } from './AuthContext.js';
import MovieDetails from './components/MovieDetails.jsx';


const App = () => {
    const { isAuthenticated  } = useContext(AuthContext);

    return (
        <>
          <Header/>
            <Router>
                <Routes>
                    <Route path = "/" element = { <LandingPage />} />
                    <Route path = "/profile" element = {<Profile />} />
                    {isAuthenticated  && <Route path="/signup" element={<SignUp/>} />}
                    {isAuthenticated && <Route path="/signin"element= {<SignIn/>} />}
                    <Route path="/movies" element={<MovieSearch/>} />
                    <Route path="/special-list" element={<SpecialList/>} />
                    <Route path = "/movies/:id" element = {<MovieDetails />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
