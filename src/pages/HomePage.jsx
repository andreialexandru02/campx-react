import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from 'react-redux';
import CampXLogo from '../Images/CampXTextLogo.png'
import "../styles/index.css"
import "../styles/homePage.css"
import { Button } from "@mui/material";
import General from "../resources/general";
import { useNavigate } from 'react-router';
import Paths from "./Paths";
function HomePage() {
    const currentCamper = useSelector((state) => state.auth.camper)
    const navigate = useNavigate();
    return (
        <>
            <Navbar isLoggedIn={currentCamper} />
            <div className="home-page-container">
                <img className="campX-logo" src={CampXLogo} alt="img" />
                <Button onClick={navigate(Paths.campsites)} className="campsites-button" variant="contained" color="success">{General.Homepage.campsitesButton}</Button>
            </div>

        </>
    )
}
export default HomePage;