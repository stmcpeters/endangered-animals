import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

const MyForm = ({ onSaveSighting, editingSighting, onUpdateSighting }) => {

    // This is the original State with not initial student 
    const [sighting, setSighting] = useState(editingSighting || {
        individual_id: "",
        sighting_date: "",
        location: "",
        healthy: "",
        researcher_email: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleIndividualIdChange = (event) => {
        const individual_id = event.target.value;
        setSighting((sighting) => ({ ...sighting, individual_id }));

    };

    const handleSightingDateChange = (event) => {
        const sighting_date = event.target.value;
        setSighting((sighting) => ({ ...sighting, sighting_date }));
    };

    const handleLocationChange = (event) => {
        const location = event.target.value;
        setSighting((sighting) => ({ ...sighting, location }));
    };

    const handleHealthChange = (event) => {
        const healthy = event.target.value;
        setSighting((sighting) => ({ ...sighting, healthy }));
    };

    const handleResearcherEmailChange = (event) => {
        const researcher_email = event.target.value;
        setSighting((sighting) => ({ ...sighting, researcher_email }));
    };

    const clearForm = () => {
        setSighting({ individual_id: "", sighting_date: "", location: "", healthy: "", researcher_email: "" })
    }

    //A function to handle the post request
    const postSighting = (newSighting) => {
        return fetch("http://localhost:8080/api/sightings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSighting),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log("From the post ", data);
                //I'm sending data to the List of Sightings (the parent) for updating the list
                onSaveSighting(data);
                //this line just for cleaning the form
                clearForm();
            });
    };

    //A function to handle the post request
    const putSighting = (toEditSighting) => {
        return fetch(`http://localhost:8080/api/sightings/${toEditSighting.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditSighting),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                onUpdateSighting(data);
                //this line just for cleaning the form
                clearForm();
            });
    };


    //A function to handle the submit in both cases - Post and Put request!
    const handleSubmit = (e) => {
        e.preventDefault();
        if (sighting.id) {
            putSighting (sighting);
        } else {
            postSighting (sighting);
        }
    };

    return (
        <Form className='form-sightings' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Individual ID</Form.Label>
                <input
                    type="text"
                    id="add-individual-id"
                    placeholder="Individual ID"
                    required
                    value={sighting.individual_id}
                    onChange={handleIndividualIdChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sighting Date</Form.Label>
                <input
                    type="text"
                    id="add-sighting-date"
                    placeholder="YYYY-MM-DD"
                    required
                    value={sighting.sighting_date}
                    onChange={handleSightingDateChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Location</Form.Label>
                <input
                    type="text"
                    id="add-location"
                    placeholder="Location"
                    required
                    value={sighting.location}
                    onChange={handleLocationChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Healthy</Form.Label>
                <input
                    type="text"
                    id="add-health"
                    placeholder="True or False"
                    required
                    value={sighting.healthy}
                    onChange={handleHealthChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email of Researcher</Form.Label>
                <input
                    type="text"
                    id="add-researcher-email"
                    placeholder="Researcher's Email"
                    required
                    value={sighting.researcher_email}
                    onChange={handleResearcherEmailChange}
                />
            </Form.Group>
            <Form.Group>
            <Button type="submit" variant="outline-success">{sighting.id ? "Edit Sighting" : "Add Sighting"}</Button>
            {sighting.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
            </Form.Group>
        </Form>
    );
};


export default MyForm