import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

const IndividualsForm = ({ onSaveIndividuals, editingIndividuals, onUpdateIndividuals }) => {

    // This is the original State with not initial student 
    const [individual, setIndividuals] = useState(editingIndividuals || {
        individual_nickname: "",
        sex: "",
        species_id: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleIndividualNicknameChange = (event) => {
        const individual_nickname = event.target.value;
        setIndividuals((individuals) => ({ ...individuals, individual_nickname }));
    };

    const handleIndividualSexChange = (event) => {
        const individual_sex = event.target.value;
        setIndividuals((individuals) => ({ ...individuals, individual_sex}));
    };

    const handleSpeciesIdChange = (event) => {
        const species_id = event.target.value;
        setIndividuals((individuals) => ({ ...individuals, species_id }));
    };


    const clearForm = () => {
        setIndividuals({ individual_nickname: "", sex: "", species_id: "" })
    }

    //A function to handle the post request
    const postIndividuals = (newIndividual) => {
        return fetch("http://localhost:8080/api/individuals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newIndividual),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log("From the post ", data);
                //I'm sending data to the List of Sightings (the parent) for updating the list
                onSaveIndividuals(data);
                //this line just for cleaning the form
                clearForm();
            });
    };

    //A function to handle the post request
    const putIndividuals = (toEditIndividuals) => {
        return fetch(`http://localhost:8080/api/individuals/${toEditIndividuals.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditIndividuals),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                onUpdateIndividuals(data);
                //this line just for cleaning the form
                clearForm();
            });
    };


    //A function to handle the submit in both cases - Post and Put request!
    const handleSubmit = (e) => {
        e.preventDefault();
        if (individual.id) {
            putIndividuals (individual);
        } else {
            postIndividuals (individual);
        }
    };

    return (
        <Form className='form-individuals' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Individual's Nickname</Form.Label>
                <input
                    type="text"
                    id="add-individual-nickname"
                    placeholder="Individual ID"
                    required
                    value={individual.individuals_nickname}
                    onChange={handleIndividualNicknameChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sex</Form.Label>
                <input
                    type="text"
                    id="add-individual-sex"
                    placeholder="Male or Female"
                    required
                    value={individual.sex}
                    onChange={handleIndividualSexChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Species ID</Form.Label>
                <input
                    type="text"
                    id="add-species-id"
                    placeholder="ID of species"
                    required
                    value={individual.species_id}
                    onChange={handleSpeciesIdChange}
                />
            </Form.Group>
            <Form.Group>
            <Button type="submit" variant="outline-success">{individual.id ? "Edit Individual" : "Add Individual"}</Button>
            {individual.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
            </Form.Group>
        </Form>
    );
};


export default IndividualsForm