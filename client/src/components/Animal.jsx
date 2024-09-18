import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const Animal = ({animal, toUpdate, toDelete}) => {

    const onUpdate = (toUpdateAnimal) => {
        toUpdate(toUpdateAnimal)
    }

    const onDelete = (toDeleteAnimal) => {
        toDelete(toDeleteAnimal)
    }

    return (
        <Card>
            <Card.Body>
            <Card.Title>
                        {animal.individual_id} <br></br>
                        {animal.sighting_date} <br></br>
                        {animal.location}<br></br>
                        {animal.healthy}
            </Card.Title>
            <Button variant="outline-danger" onClick={()=>{onDelete(animal)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdate(animal)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button>
            </Card.Body>
        </Card>
    )

}

export default Student;