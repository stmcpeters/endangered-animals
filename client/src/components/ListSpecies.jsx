import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import SpeciesForm from './SpeciesForm';
import Species from './Species';

const ListSpecies = () => {

    // this is my original state with an array of species 
    const [species, setSpecies] = useState([]);

    //this is the state needed for the UpdateRequest
    const [editingSpecies, setEditingSpecies] = useState(null)

    const loadSpecies = () => {
        // A function to fetch the list of species that will be load anytime that list change
        fetch("http://localhost:8080/api/species")
            .then((response) => response.json())
            .then((species) => {
                setSpecies(species);
            });
    }

    useEffect(() => {
        loadSpecies();
    }, [species]);

    const onSaveSpecies = (newSpecies) => {
        //console.log(newSpecies, "From the parent - List of Species");
        setSpecies((species) => [...species, newSpecies]);
    }


    //A function to control the update in the parent (species component)
    const updateSpecies = (savedSpecies) => {
        // console.log("Line 29 savedSpecies", savedSpecies);
        // This function should update the whole list of species - 
        loadSpecies();
    }

    //A function to handle the Delete funtionality
    const onDelete = (species) => {
        //console.log(species, "delete method")
        return fetch(`http://localhost:8080/api/species/${species.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadSpecies();
            }
        })
    }

    //A function to handle the Update functionality
    const onUpdate = (toUpdateSpecies) => {
        //console.log(toUpdateSighting);
        setEditingSpecies(toUpdateSpecies);

    }



    return (
        <div className="mybody">
        <div className="list-species">
            <h2>Tracked Endangered Species</h2>
            <ul>
                {species.map((species) => {
                    return <li key={species.id}> <Species species={species} toDelete={onDelete} toUpdate={onUpdate} /></li>
                })}
            </ul>
        </div>
        <SpeciesForm key={editingSpecies ? editingSpecies.id : null} onSaveSpecies={onSaveSpecies} editingSpecies={editingSpecies} onUpdateSpecies={updateSpecies} />
        </div>
    );
}


export default ListSpecies