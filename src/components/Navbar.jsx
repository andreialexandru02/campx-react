// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; // You can replace this with your routing library
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../store/authSlice';
import GeneralResources from '../resources/general'
import Paths from '../pages/Paths'
import '../styles/index.css'
const Navbar = ({ isLoggedIn }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <AppBar position="static" color="success" className='navbar'>
      <Toolbar className='toolbar'>
        {isLoggedIn ? (
          <Button color="inherit" onClick={() =>  {dispatch(logout())
                                                   window.location.reload()}}>
            {GeneralResources.Navbar.logout}
          </Button>
        ) : (
            <>
            <Button color="inherit" onClick={() => navigate(Paths.login)}>
            {GeneralResources.Navbar.login}
            
            </Button>
            <Button color="inherit" onClick={() => navigate(Paths.register)}>
             {GeneralResources.Navbar.register}
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
