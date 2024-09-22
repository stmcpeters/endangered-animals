import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import MyForm from './SightingsForm';
import Sightings from './Sightings';

const ListSightings = () => {

    // this is my original state with an array of sightings 
    const [sighting, setSighting] = useState([]);

    //this is the state needed for the UpdateRequest
    const [editingSighting, setEditingSighting] = useState(null)

    const loadSightings = () => {
        // A function to fetch the list of sightings that will be load anytime that list change
        fetch("http://localhost:8080/api/sightings")
            .then((response) => response.json())
            .then((sighting) => {
                setSighting(sighting);
            });
    }

    useEffect(() => {
        loadSightings();
    }, [sighting]);

    const onSaveSighting = (newSighting) => {
        //console.log(newSighting, "From the parent - List of Sightings");
        setSighting((sighting) => [...sighting, newSighting]);
    }


    //A function to control the update in the parent (student component)
    const updateSighting = (savedSighting) => {
        // console.log("Line 29 savedSighting", savedSighting);
        // This function should update the whole list of sightings - 
        loadSightings();
    }

    //A function to handle the Delete funtionality
    const onDelete = (sighting) => {
        //console.log(sighting, "delete method")
        return fetch(`http://localhost:8080/api/sightings/${sighting.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadSightings();
            }
        })
    }

    //A function to handle the Update functionality
    const onUpdate = (toUpdateSighting) => {
        //console.log(toUpdateSighting);
        setEditingSighting(toUpdateSighting);

    }



    return (
        <div className="mybody">
        <div className="list-sightings">
            <h2>Latest Endangered Animal Sightings</h2>
            <ul>
                {sighting.map((sighting) => {
                    return <li key={sighting.id}> <Sightings sighting={sighting} toDelete={onDelete} toUpdate={onUpdate} /></li>
                })}
            </ul>
        </div>
        <MyForm key={editingSighting ? editingSighting.id : null} onSaveSighting={onSaveSighting} editingSighting={editingSighting} onUpdateSighting={updateSighting} />
        </div>
    );
}


export default ListSightings