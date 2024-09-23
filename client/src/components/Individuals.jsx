import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const Individuals = ({individual, toUpdate, toDelete}) => {

    const onUpdate = (toUpdateIndividuals) => {
        toUpdate(toUpdateIndividuals)
    }

    const onDelete = (toDeleteIndividuals) => {
        toDelete(toDeleteIndividuals)
    }

    return (
        <Card>
            <Card.Body>
            <Card.Title>
                {/* everything to display on the individuals cards */}
                  Individual ID: {individual.id} <br></br>
                  Nickname: {individual.individuals_nickname}<br></br>
                  {individual.sex}
            </Card.Title>
            <Button variant="outline-danger" onClick={()=>{onDelete(individual)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdate(individual)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button>
            </Card.Body>
        </Card>
    )

}

export default Individuals;