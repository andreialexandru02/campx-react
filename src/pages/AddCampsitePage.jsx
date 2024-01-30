import React, { useState, useEffect } from "react";
import '../styles/addCampsitePage.css'
import '../styles/index.css'
import Campsites from '../resources/campsites'
import LeafletMap from '../components/LeafletMap'
import { useNavigate } from 'react-router';
import Paths from "./Paths"
import { createFormValidation } from '../utils/createFormValidation'
import RegexTest from "../resources/RegexTest";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  InputLabel,
  FormControl

} from "@mui/material";
function AddCampsitesPage() {

  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState(null)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState(1)
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const camperId = 2;
  const rating = 0;
  const images = null;
  const [isSubminDisabled, setIsSubminDisabled] = useState(true)

  const [nameError, setNameError] = useState('')
  const [latitudeError, setLatitudeError] = useState('')
  const [longitudeError, setLongitudeError] = useState('')

  var isRequiredName = createFormValidation(setNameError)
  var isRequiredLatitude = createFormValidation(setLatitudeError)
  var isRequiredLongitude = createFormValidation(setLongitudeError)
  var isValidLatitude = createFormValidation(setLatitudeError, Campsites.Resources.coordinatesError, RegexTest.coordinates)
  var isValidLongitude = createFormValidation(setLongitudeError, Campsites.Resources.coordinatesError, RegexTest.coordinates)

  const isFormValid = () => {
    return isRequiredName(name) && 
        isRequiredLatitude(latitude) &&
        isRequiredLongitude(longitude) &&
        isValidLatitude(latitude) &&
        isValidLongitude(longitude)
  }


  useEffect(()=>setIsSubminDisabled(!isFormValid()),[name,latitude,longitude])
  
  const handleSubmitClick = () => {
    fetch('https://localhost:7118/Map/AddCampsite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name: name, Description: description, Difficulty: difficulty, Latitude: latitude, Longitude: longitude, CamperId: camperId, Rating: rating, Images: images }), // Convert data to JSON string
    }).then(
      navigate(Paths.campsites) )
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  const handleMapClick = (clickedCoordinates) => {
    setCoordinates(clickedCoordinates);
  };
  useEffect(() => {
    if(isValidLatitude(latitude) && isValidLongitude(longitude)){
      setCoordinates([{ id: 1, latitude: latitude, longitude: longitude }])
    }
  }, [latitude, longitude])
  //console.log(coordinates? coordinates[0].latitude : 45.9443);
  return (
    <>
      <LeafletMap latitude={coordinates? coordinates[0].latitude : 45.9443} longitude={coordinates ? coordinates[0].longitude : 25.0094} zoom={7} height="500px" width="50%" coordinates={coordinates} onMapClick={handleMapClick} />
      <Card variant="outlined" className="card-container" >
        <CardContent>
          <form>
            <div className="form-group">
              <TextField
                value={name}
                label={Campsites.Resources.name}
                onChange={e => {
                  setName(e.target.value)
                }}
                required 
                error={nameError != ""}
                helperText={nameError}
              />
            </div>
            <div className="form-group">
              <TextField
                value={description}
                label={Campsites.Resources.description}
                onChange={e => {
                  setDescription(e.target.value)
                }}
              />
            </div>
            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{Campsites.Resources.difficulty}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={difficulty}
                  label={Campsites.Resources.difficulty}
                  onChange={e => {
                    setDifficulty(e.target.value)
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <TextField
                value={latitude}
                label={Campsites.Resources.latitude}
                onChange={e => {
                    setLatitude(e.target.value)
                }}
                error={latitudeError != ""}
                helperText={latitudeError}
              />
            </div>
            <div className="form-group">
              <TextField
                value={longitude}
                label={Campsites.Resources.longitude}
                onChange={e => {           
                    setLongitude(e.target.value)                  
                }}
                error={longitudeError != ""}
                helperText={longitudeError}
              />
            </div>
            <Button onClick={handleSubmitClick}
              variant="contained"
              color="success"
              type="submit"
              disabled={isSubminDisabled}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
export default AddCampsitesPage;