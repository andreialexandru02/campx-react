import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
    Button,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    Card,
    CardContent,
    CircularProgress,
    Alert

} from "@mui/material";
import '../styles/index.css'
import '../styles/App.css'
import '../styles/campsiteDetails.css'
import LeafletMap from "../components/LeafletMap";
import Campsites from "../resources/campsites";
import { useNavigate } from 'react-router';
import Paths from "./Paths";
import Navbar from "../components/Navbar";
import { applyMiddleware } from "redux";
import General from "../resources/general";
const CampsiteDetailsPage = () => {
    const currentCamper = useSelector((state) => state.auth.camper)
    const navigate = useNavigate();
    const [isDeleteUnauthorized, setIsDeleteUnauthorized] = useState(false)
  
    const { id } = useParams();
    const [campsite, setCampsite] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const fetchCampiste = async () => {
        const token = currentCamper?.jwtToken
        const response = await fetch(`https://localhost:7118/Map/CampsiteDetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authentication': token,             
            },
        });

        if (!response.ok) {
            navigate(Paths.login)    
        }
        else {
            const data = await response.json();
            setCampsite(data)
            setIsLoading(false)
        }
    }

   useEffect(() => {
    fetchCampiste()
    }, [])

    const handleDelete = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete?');
        if (isConfirmed) {
            fetchDelete()
        }
    }
    const fetchDelete = async () => {
        const token = currentCamper?.jwtToken
        const response = await fetch(`https://localhost:7118/Map/DeleteCampsite/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authentication': token,
                'camper-id' : campsite.camperId
            },
        });

        if (!response.ok) {
            setIsDeleteUnauthorized(true)
        }
        else {
            navigate(Paths.campsites)
        }
    }
    return (
        <>
              <Navbar isLoggedIn={currentCamper} />
            <div className="map">
                {isLoading ? <CircularProgress /> : <LeafletMap latitude={campsite.latitude} longitude={campsite.longitude} zoom={8} height="400px" width="50%" coordinates={[{ id: 1, latitude: campsite.latitude, longitude: campsite.longitude }]} />}
            </div>
            <Card variant="outlined" className="campsites-details-card">
                <CardContent>
                    {isLoading ? <CircularProgress /> :
                        <div>
                            <div>{campsite.name}</div>
                            <div>{campsite.description ?? "Nu exista descriere"}</div>
                            <div>Difficulty: {campsite.difficulty}</div>
                            <div>Rating: {campsite.rating}</div>
                        </div>}
                </CardContent>
            </Card>
            <div className="edit-delete-buttons-div">
                <Button onClick={handleDelete} variant="contained" color="success">
                    {Campsites.Resources.deleteCampsite}
                </Button>
                {isDeleteUnauthorized && <Alert severity="warning">{General.Erorrs.unauthorized}</Alert>}
            </div>
        </>
    );
};

export default CampsiteDetailsPage;
