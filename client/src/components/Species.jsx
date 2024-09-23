import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const Species = ({species, toUpdate, toDelete}) => {

    const onUpdate = (toUpdateSpecies) => {
        toUpdate(toUpdateSpecies)
    }

    const onDelete = (toDeleteSpecies) => {
        toDelete(toDeleteSpecies)
    }

    return (
        <Card>
            <Card.Body>
            <Card.Title>
                {/* everything to display on the individuals cards */}
                  Species ID: {species.id} <br></br>
                  Common Name: {species.common_name} <br></br>
                  Scientific Name: {species.scientific_name}<br></br>
                  Conservation Status: {species.conservation_status}<br></br>
                  Population: {species.population}
            </Card.Title>
            <Button variant="outline-danger" onClick={()=>{onDelete(species)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdate(species)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button>
            </Card.Body>
        </Card>
    )

}

export default Species;