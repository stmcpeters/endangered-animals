import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const Sightings = ({sighting, toUpdate, toDelete}) => {

    const onUpdate = (toUpdateSighting) => {
        toUpdate(toUpdateSighting)
    }

    const onDelete = (toDeleteSighting) => {
        toDelete(toDeleteSighting)
    }

    return (
        <Card>
            <Card.Body>
            <Card.Title>
                {/* everything to display on the sightings cards */}
                        {sighting.individual_id} <br></br>
                        {sighting.individuals_nickname}<br></br>
                        {/* splits the timestamp string at the 'T' character (separates date and time in long format) and takes date only */}
                        {sighting.sighting_date.split('T')[0]} <br></br>
                        {/* {sighting.sighting_date}<br></br> */}
                        {sighting.location}<br></br>
                        {/* converts boolean value to string to display on card */}
                        Healthy: {String(sighting.healthy)}<br></br>
                        Researcher Email: {sighting.researcher_email}
            </Card.Title>
            <Button variant="outline-danger" onClick={()=>{onDelete(sighting)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdate(sighting)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button>
            </Card.Body>
        </Card>
    )

}

export default Sightings;