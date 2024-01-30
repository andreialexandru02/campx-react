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
    CircularProgress

} from "@mui/material";
import '../styles/index.css'
import '../styles/App.css'
import LeafletMap from "../components/LeafletMap";
import Campsites from "../resources/campsites";
const CampsiteDetailsPage = () => {
    const { id } = useParams();
    const [campsite, setCampsite] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const fetchCampiste = () => {
        fetch(`https://localhost:7118/Map/CampsiteDetails/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCampsite(data)
                setIsLoading(false)
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => fetchCampiste(), [])
    return (
        <>
            <div className="map">
                {isLoading ? <CircularProgress /> : <LeafletMap latitude={campsite.latitude} longitude={campsite.longitude} zoom={8} height="500px" width="50%" coordinates={[{ id: 1, latitude: campsite.latitude, longitude: campsite.longitude }]} />}
            </div>
            <Card variant="outlined" className="campsites-table-card">
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
            <div>
                <Button variant="contained" color="success">
                    {Campsites.Resources.deleteCampsite}
                </Button>
                <Button variant="contained" color="success">
                    {Campsites.Resources.editCampsite}
                </Button>
            </div>
        </>
    );
};

export default CampsiteDetailsPage;
