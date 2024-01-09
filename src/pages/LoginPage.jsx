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



    const navigate = useNavigate();


    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')




    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    const isValidRequiredEmail = createFormValidation(setEmailError)
    const isValidEmail = createFormValidation(setEmailError, Register.Resources.invalidEmail, RegexTest.email)
    const isValidRequiredPassword = createFormValidation(setPasswordError)
    const handleDisableSubmitButton = () => {
        setIsSubmitDisabled(!(
            isValidRequiredEmail(email) &&
            isValidEmail(email) &&
            isValidRequiredPassword(password)
        ))
    }
    useEffect(() => {
        handleDisableSubmitButton();
    }, [email, password])
    const handeSubmitClick = (e) => {
        e.preventDefault();
        fetch('https://localhost:7118/CamperAccount/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, areCredentialsInvalid: false }), // Convert data to JSON string
        }).then(
            // navigate(Paths.login))
        )
        .catch(error => {

            console.error('There was a problem with the fetch operation:', error);
        });
    }
    return (
        <Card variant="outlined" className="card-container">
            <CardContent>
                <form>
                    <div className="form-group">
                        <TextField
                            type="email"
                            label={Register.Resources.email}
                            onChange={e => {
                                setEmail(e.target.value)
                            }}
                            required
                            error={emailError !== ''}
                            helperText={emailError}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            type="password"
                            label={Register.Resources.password}
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                            required
                            error={passwordError !== ''}
                            helperText={passwordError}
                        />
                    </div>
                    <Button onClick={handeSubmitClick}
                        variant="contained"
                        color="success"
                        type="submit"
                        disabled={isSubmitDisabled}
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
export default RegisterPage;