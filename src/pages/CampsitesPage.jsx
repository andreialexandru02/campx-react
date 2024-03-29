import React, { useState, useEffect, useRef } from "react";


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
import { useNavigate } from 'react-router';
import Paths from './Paths'
import Campsites from '../resources/campsites'
import '../styles/campsitesPage.css'
import LeafletMap from "../components/LeafletMap";
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";
function CampsitesPage() {

  const [campsites, setCampsites] = useState()
  const [coordinates, setCoordinates] = useState()
  const [isLoadingTable, setIsLoadingTable] = useState(true)
  const [isLoadingMap, setIsLoadingMap] = useState(true)
  const navigate = useNavigate();
  const timeoutIdRef = useRef(null);

  const currentCamper = useSelector((state) => state.auth.camper)

  console.log(currentCamper);
  const fetchData = async () => {
      
      const token = currentCamper?.jwtToken
      const response = await fetch('https://localhost:7118/Map/ShowMap', {
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
        setCampsites(data);
        setIsLoadingTable(false);

      }
  };
  const fetchCoordinates = (campsiteId = 0) => {
    fetch('https://localhost:7118/Map/DisplayCampsites')
      .then(response => response.json())
      .then(data => {
        if (campsiteId) {
          data.map(campsite => {
            if (campsite.id == campsiteId) {
              setCoordinates([campsite])
            }
          })
        }
        else {
          setCoordinates(data)
        }
        setIsLoadingMap(false)
      })
      .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    fetchCoordinates()
    fetchData()
  }, [])

  const handleMouseLeave = () => {

    clearTimeout(timeoutIdRef.current);

    const newTimeoutId = setTimeout(() => {
      fetchCoordinates()
    }, 100);

    timeoutIdRef.current = newTimeoutId
  };

  return (
    <>
      <Navbar isLoggedIn={currentCamper} />
      {currentCamper &&
      <Button variant="contained" className="add-button" color="success" onClick={() => navigate(Paths.addCampsite)}>
        {Campsites.Resources.addCampsite}
      </Button> }
      <div className="page-container">
        <div className="map">
          {isLoadingTable ? <CircularProgress /> : <LeafletMap latitude={45.9443} longitude={25.0094} zoom={7} height="700px" width="100%" coordinates={coordinates} />}
        </div>
        <div className="table">
          <Card variant="outlined" className="campsites-table-card">
            <CardContent>
              {isLoadingTable ? <CircularProgress /> :
                <>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">{Campsites.Resources.name}</TableCell>
                          <TableCell align="center">{Campsites.Resources.description}</TableCell>
                          <TableCell align="center">{Campsites.Resources.difficulty}</TableCell>
                          <TableCell align="center">{Campsites.Resources.rating}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {campsites
                          ? campsites.map((c) => (
                            <>
                              <TableRow
                                key={c.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                onMouseEnter={() => { clearTimeout(timeoutIdRef.current); fetchCoordinates(c.id) }}
                                onMouseLeave={handleMouseLeave}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  navigate(`${Paths.campsiteDetails}/${c.id}`)

                                }}
                              >

                                <TableCell align="center" component="th" scope="row">{c.name}</TableCell>
                                <TableCell align="center">{c.description}</TableCell>
                                <TableCell align="center"> {c.difficulty}</TableCell>
                                <TableCell align="center">{c.rating} </TableCell>
                              </TableRow>
                            </>
                          ))
                          : ""}
                      </TableBody>
                    </Table>
                  </TableContainer>

                </>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
export default CampsitesPage;