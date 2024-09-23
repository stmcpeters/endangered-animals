import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import Individuals from './Individuals';
import IndividualsForm from './IndividualsForm';

const ListIndividuals = () => {

    // this is my original state with an array of individuals 
    const [individual, setIndividual] = useState([]);

    //this is the state needed for the UpdateRequest
    const [editingIndividual, setEditingIndividual] = useState(null)

    const loadIndividuals = () => {
        // A function to fetch the list of individuals that will be load anytime that list change
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
        //console.log(newIndividual, "From the parent - List of individuals");
        setIndividual((individual) => [...individual, newIndividual]);
    }


    //A function to control the update in the parent (individual component)
    const updateIndividual = (savedIndividual) => {
        // console.log("Line 29 savedIndividual", savedIndividual);
        // This function should update the whole list of individuals - 
        loadIndividuals();
    }

    //A function to handle the Delete funtionality
    const onDelete = (individual) => {
        //console.log(individual, "delete method")
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
        //console.log(toUpdateIndividual);
        setEditingIndividual(toUpdateIndividual);

    }



    return (
        <div className="mybody">
        <div className="list-individuals">
            <h2>Individuals</h2>
            <ul>
                {individual.map((individual) => {
                    return <li key={individual.id}> <Individuals individual={individual} toDelete={onDelete} toUpdate={onUpdate} /></li>
                })}
            </ul>
        </div>
        <IndividualsForm key={editingIndividual ? editingIndividual.id : null} onSaveIndividual={onSaveIndividual} editingIndividual={editingIndividual} onUpdateIndividual={updateIndividual} />
        </div>
    );
}


export default ListIndividuals