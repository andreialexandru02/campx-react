import React, { useState, useEffect } from "react";

import { Button, TextField } from "@mui/material";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Register from '../resources/register'
import '../styles/index.css'
import '../styles/App.css'
import { createFormValidation } from '../utils/createFormValidation'
import RegexTest from "../resources/RegexTest";
import { useNavigate } from 'react-router';
import Paths from './Paths'
function RegisterPage() {

    const [campsites, setCampsites] = useState()
    const fetchData = () => {
        fetch('/https://localhost:7118/Map/ShowMap')
        .then(response => console.log(response))
        .then(data =>  {
            setCampsites(data)})
        .catch(error => console.error('Error:', error));
      }
    console.log(campsites)
    useEffect(()=> fetchData)
    return (
       <div>asdasd</div>
    )
}
export default RegisterPage;