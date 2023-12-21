import React, {  useState, useEffect } from "react";

import { Button,TextField } from "@mui/material";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Register from '../resources/register'
import '../styles/index.css'
import '../styles/App.css'
import { useNavigate } from 'react-router';
import Paths from './Paths'
import {createFormValidation} from '../utils/createFormValidation'
import RegexTest from "../resources/RegexTest";
import genericValidationMessages from "../resources/genericValidationMessages";
function RegisterPage() {

    const navigate = useNavigate();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState(null)
    
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')


    const isValidRequiredEmail = createFormValidation(setEmailError)
    const isValidEmail = createFormValidation(setEmailError, Register.Resources.invalidEmail, RegexTest.email)
    const isValidRequiredPassword = createFormValidation(setPasswordError)
    const isValidRequiredConfirmPassword = createFormValidation(setConfirmPasswordError);
    const isConfirmPasswordValid = createFormValidation(setConfirmPasswordError, genericValidationMessages.confirmationPasswordMatchValidationText, (value) => value === password)
    const isValidRequiredFirstName = createFormValidation(setFirstNameError)
    const isValidRequiredLastName = createFormValidation(setLastNameError)


    const handleDisableSubmitButton = () => {
        setIsSubmitDisabled(!(
            isValidRequiredEmail(email) &&
            isValidEmail(email) &&
            isValidRequiredPassword(password) &&
            isValidRequiredConfirmPassword(confirmPassword) &&
            isConfirmPasswordValid(confirmPassword) &&
            isValidRequiredFirstName(firstName) &&
            isValidRequiredLastName(lastName) 
        ))
    }
    useEffect(() => {
        handleDisableSubmitButton();
    }, [email, password, confirmPassword, firstName, lastName])
    
    const handeSubmitClick = () => {
        fetch('https://localhost:7118/CamperAccount/Register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({Email: email, Password: password, ConfirmPassword: confirmPassword, FirstName: firstName, LastName: lastName, BirthDay: birthDate}), // Convert data to JSON string
          }) .then(data => {
              navigate(Paths.Resources.login)
          }).catch(error => {
  
            console.error('There was a problem with the fetch operation:', error);
          });
    }
    return (      
        <Card variant="outlined" className="card-container">
              <CardContent>
            <form>
                <div className="form-group">
                    <TextField
                        type = "email"
                        label= {Register.Resources.email}
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
                        type = "password"
                        label= {Register.Resources.password}
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                        required    
                        error={passwordError !== ''}
                        helperText={passwordError}
                        />
                </div>
                <div className='form-group'>
                    <TextField           
                        type = "password"
                        label= {Register.Resources.confirmPassword}     
                        onChange={e => {
                            setConfirmPassword(e.target.value)
                        }}  
                        required
                        error={confirmPasswordError !== ''}
                        helperText={confirmPasswordError}
                        />                   
                </div>
                <div className='form-group'>
                    <TextField           
                        type = "text"
                        label= {Register.Resources.firstName}       
                        onChange={e => {
                            setFirstName(e.target.value)
                        }}
                        required
                        error={firstNameError !== ''}
                        helperText={firstNameError}
                        />                   
                </div>
                <div className='form-group'>
                    <TextField           
                        type = "text"
                        label= {Register.Resources.lastName} 
                        onChange={e => {
                            setLastName(e.target.value)
                        }}    
                        required  
                        error={lastNameError !== ''}
                        helperText={lastNameError}
                        />                   
                </div>
                <div className='form-group'>
                    <TextField           
                        type = "date"              
                        onChange={e => {
                            setBirthDate(e.target.value)
                        }}      
                        />                   
                </div>           
                <Button onClick={handeSubmitClick}
                    variant = "contained"
                    color = "success"
                    type="submit"
                    disabled = {!isSubmitDisabled}
                    >
                    Submit
                </Button>
            </form>
    </CardContent>
    </Card>
    )
}
export default RegisterPage;