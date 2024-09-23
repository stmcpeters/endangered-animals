import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

const SpeciesForm = ({ onSaveSpecies, editingSpecies, onUpdateSpecies }) => {

    // This is the original State with not initial student 
    const [species, setSpecies] = useState(editingSpecies || {
        common_name: "",
        scientific_name: "",
        population: "",
        conservation_status: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleCommonNameChange = (event) => {
        const common_name = event.target.value;
        setSpecies((species) => ({ ...species, common_name }));
    };

    const handleScientificNameChange = (event) => {
        const scientific_name = event.target.value;
        setSpecies((species) => ({ ...species, scientific_name}));
    };

    const handlePopulationChange = (event) => {
        const population = event.target.value;
        setSpecies((species) => ({ ...species, population }));
    };

    const handleConservationStatusChange = (event) => {
      const conservation_status = event.target.value;
      setSpecies((species) => ({ ...species, conservation_status }));
    };

    const clearForm = () => {
        setSpecies({ common_name: "", scientific_name: "", population: "", conservation_status: "" })
    }

    //A function to handle the post request
    const postSpecies = (newSpecies) => {
        return fetch("http://localhost:8080/api/species", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSpecies),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log("From the post ", data);
                //I'm sending data to the List of Sightings (the parent) for updating the list
                onSaveSpecies(data);
                //this line just for cleaning the form
                clearForm();
            });
    };

    //A function to handle the post request
    const putSpecies = (toEditSpecies) => {
        return fetch(`http://localhost:8080/api/species/${toEditSpecies.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditSpecies),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                onUpdateSpecies(data);
                //this line just for cleaning the form
                clearForm();
            });
    };


    //A function to handle the submit in both cases - Post and Put request!
    const handleSubmit = (e) => {
        e.preventDefault();
        if (species.id) {
            putSpecies (species);
        } else {
            postSpecies (species);
        }
    };

    return (
        <Form className='form-species' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Species Common Name</Form.Label>
                <input
                    type="text"
                    id="add-common-name"
                    placeholder="Common Name"
                    required
                    value={species.common_name}
                    onChange={handleCommonNameChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Scientific Name</Form.Label>
                <input
                    type="text"
                    id="add-scientific-name"
                    placeholder="Scientific Name"
                    required
                    value={species.scientific_name}
                    onChange={handleScientificNameChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Population</Form.Label>
                <input
                    type="text"
                    id="add-population"
                    placeholder="Living Population"
                    required
                    value={species.population}
                    onChange={handlePopulationChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Conservation Status</Form.Label>
                <input
                    type="text"
                    id="add-conservation-status"
                    placeholder="Conservation Status"
                    required
                    value={species.conservation_status}
                    onChange={handleConservationStatusChange}
                />
            </Form.Group>
            <Form.Group>
            <Button type="submit" variant="outline-success">{species.id ? "Edit Species" : "Add Species"}</Button>
            {species.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
            </Form.Group>
        </Form>
    );
};


export default SpeciesForm