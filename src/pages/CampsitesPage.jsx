import React, { useState, useEffect } from "react";


import {
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Stack,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CircularProgress

} from "@mui/material";
import Register from '../resources/register'
import '../styles/index.css'
import '../styles/App.css'
import { useNavigate } from 'react-router';
import Paths from './Paths'
import Campsites from '../resources/campsites'
import '../styles/campsitesPage.css'
import LeafletMap from "../components/LeafletMap";
import { map } from "leaflet";
function CampsitesPage() {

  const [campsites, setCampsites] = useState()
  const [coordinates, setCoordinates] = useState()
  const [isLoadingTable, setIsLoadingTable] = useState(true)
  const [isLoadingMap, setIsLoadingMap] = useState(true)
  const navigate = useNavigate();

  const fetchData = () => {
    fetch('https://localhost:7118/Map/ShowMap')
      .then(response => response.json())
      .then(data => {
        setCampsites(data)
        setIsLoadingTable(false)
      })
      .catch(error => console.error('Error:', error));
  }
  const fetchCoordinates = (campsiteId = null) => {
    fetch('https://localhost:7118/Map/DisplayCampsites')
      .then(response => response.json())
      .then(data => {
        if(campsiteId){
          data.map(campsite =>{
            if(campsite.id == campsiteId){
              console.log(campsite)
            //  setCoordinates(campsite)
              setCoordinates([campsite])
            }
          })
        }
        setCoordinates(data)
        setIsLoadingMap(false)
      })
      .catch(error => console.error('Error:', error));
  }
  useEffect(() => fetchCoordinates, [])
  useEffect(() => fetchData, [campsites])
  return (
    <>
      <Button variant="contained" className="add-button" color="success" onClick = {() =>  navigate(Paths.addCampsite)}>
        {Campsites.Resources.addCampsite}
      </Button>
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
                                onMouseEnter={() =>  fetchCoordinates(c.id)}
                                onMouseLeave={fetchCoordinates}>
                              
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