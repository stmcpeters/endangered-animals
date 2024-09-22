import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import MyForm from './Form';
import Individuals from './Individuals';

const ListIndividuals = () => {

    // this is my original state with an array of individuals 
    const [individual, setIndividual] = useState([]);

    //this is the state needed for the UpdateRequest
    const [editingIndividual, setEditingIndividual] = useState(null)

    const loadIndividuals = () => {
        // A function to fetch the list of sightings that will be load anytime that list change
        fetch("http://localhost:8080/api/individuals")
            .then((response) => response.json())
            .then((individual) => {
                setIndividual(individual);
            });
    }

    useEffect(() => {
        loadIndividuals();
    }, [individual]);

    const onSaveIndividual = (newIndividual) => {
        //console.log(newSighting, "From the parent - List of Sightings");
        setIndividual((individual) => [...individual, newIndividual]);
    }


    //A function to control the update in the parent (student component)
    const updateIndividual = (savedIndividual) => {
        // console.log("Line 29 savedSighting", savedSighting);
        // This function should update the whole list of sightings - 
        loadIndividuals();
    }

    //A function to handle the Delete funtionality
    const onDelete = (individual) => {
        //console.log(sighting, "delete method")
        return fetch(`http://localhost:8080/api/individuals/${individual.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadIndividuals();
            }
        })
    }

    //A function to handle the Update functionality
    const onUpdate = (toUpdateIndividual) => {
        //console.log(toUpdateSighting);
        setEditingIndividual(toUpdateIndividual);

    }



    return (
        <div className="mybody">
        <div className="list-individuals">
            <h2>Currently Tracked Individuals</h2>
            <ul>
                {individual.map((individual) => {
                    return <li key={individual.id}> <Individuals individual={individual} toDelete={onDelete} toUpdate={onUpdate} /></li>
                })}
            </ul>
        </div>
        {/* <MyForm key={editingIndividual ? editingIndividual.id : null} onSaveIndividual={onSaveIndividual} editingIndividual={editingIndividual} onUpdateIndividual={updateIndividual} /> */}
        </div>
    );
}


export default ListIndividuals