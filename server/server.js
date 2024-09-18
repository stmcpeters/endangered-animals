const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

////////////////////////// sightings table //////////////////////////////

// create the get request for sightings in the endpoint '/api/sightings'
app.get('/api/sightings', async (req, res) => {
    try {
        const { rows: sightings } = await db.query('SELECT * FROM sightings');
        res.send(sightings);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// POST request to create new sightings
app.post('/api/sightings', async (req, res) => {
    try {
        const newSighting = {
            individual_id: req.body.individual_id,
            sighting_date: req.body.sighting_date,
            location: req.body.location,
            healthy: req.body.healthy,
            researcher_email: req.body.researcher_email
        };
        //console.log([newSighting.individual_id, newSighting.sighting_date, newSighting.location, newSighting.healthy, newSighting.researcher_email]);
        const result = await db.query(
            'INSERT INTO sightings(individual_id, sighting_date, location, healthy, researcher_email) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [newSighting.individual_id, newSighting.sighting_date, newSighting.location, newSighting.healthy, newSighting.researcher_email],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for sightings
app.delete('/api/sightings/:id', async (req, res) => {
    try {
        const sightingId = req.params.id;
        await db.query('DELETE FROM sightings WHERE id=$1', [sightingId]);
        console.log(`Sighting with the id: ${sightingId} has been deleted`);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

// PUT request - Update a sighting 
app.put('/api/sightings/:id', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the sighting to be updated
    const sightingId = req.params.id;
    const updatedSighting = { individual_id: req.body.individual_id, sighting_date: req.body.sighting_date, location: req.body.location, healthy: req.body.healthy, researcher_email: req.body.researcher_email}
    console.log("In the server from the url - the sighting id", sightingId);
    console.log("In the server, from the react - the sighting to be edited", updatedSighting);
    // UPDATE sightings SET location = "something" WHERE id="16";
    const query = `UPDATE sightings SET individual_id=$1, sighting_date=$2, location=$3, healthy=$4, researcher_email=$5 WHERE id=${sightingId} RETURNING *`;
    const values = [updatedSighting.individual_id, updatedSighting.sighting_date, updatedSighting.location, updatedSighting.healthy, updatedSighting.researcher_email];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

////////////////////////// individuals table //////////////////////////////

// GET request for individuals in the endpoint '/api/individuals'
app.get('/api/individuals', async (req, res) => {
    try {
        const { rows: individuals } = await db.query('SELECT * FROM individuals');
        res.send(individuals);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// POST request to create new individuals
app.post('/api/individuals', async (req, res) => {
    try {
        const newIndividual = {
            individuals_nickname: req.body.individuals_nickname,
            sex: req.body.sex,
            species_id: req.body.species_id
        };
        //console.log([newIndividual.individuals_nickname, newIndividual.sex, newIndividual.species_id]);
        const result = await db.query(
            'INSERT INTO individuals (individuals_nickname, sex, species_id) VALUES($1, $2, $3) RETURNING *',
            [newIndividual.individuals_nickname, newIndividual.sex, newIndividual.species_id],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for individuals
app.delete('/api/individuals/:id', async (req, res) => {
    try {
        const individualId = req.params.id;
        await db.query('DELETE FROM individuals WHERE id=$1', [individualId]);
        console.log(`Individual with the id: ${individualId} has been deleted`);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

// PUT request - Update an individual 
app.put('/api/individuals/:id', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the individual to be updated
    const individualId = req.params.id;
    const updatedIndividual = { individuals_nickname: req.body.individuals_nickname, sex: req.body.sex, species_id: req.body.species_id }
    console.log("In the server from the url - the individual id", individualId);
    console.log("In the server, from the react - the individual to be edited", updatedIndividual);
    // UPDATE individuals SET sex = "something" WHERE id="16";
    const query = `UPDATE individuals SET individuals_nickname=$1, sex=$2, species_id=$3 WHERE id=${individualId} RETURNING *`;
    const values = [updatedIndividual.individuals_nickname, updatedIndividual.sex, updatedIndividual.species_id];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

////////////////////////// species table //////////////////////////////

// GET request for species in the endpoint '/api/species'
app.get('/api/species', async (req, res) => {
    try {
        const { rows: species } = await db.query('SELECT * FROM species');
        res.send(species);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// POST request to create new individuals
app.post('/api/species', async (req, res) => {
    try {
        const newSpecies = {
            common_name: req.body.common_name,
            scientific_name: req.body.scientific_name,
            population: req.body.population,
            conservation_status: req.body.conservation_status
        };
        //console.log([newSpecies.common_name, newSpecies.scientific_name, newSpecies.population, newSpecies.conservation_status]);
        const result = await db.query(
            'INSERT INTO species (common_name, scientific_name, population, conservation_status) VALUES($1, $2, $3, $4) RETURNING *',
            [newSpecies.common_name, newSpecies.scientific_name, newSpecies.population, newSpecies.conservation_status],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for species
app.delete('/api/species/:id', async (req, res) => {
    try {
        const speciesId = req.params.id;
        await db.query('DELETE FROM species WHERE id=$1', [speciesId]);
        console.log(`Species with the id: ${speciesId} has been deleted`);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

// PUT request - Update a species 
app.put('/api/species/:id', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the species to be updated
    const speciesId = req.params.id;
    const updatedSpecies = { common_name: req.body.common_name, scientific_name: req.body.scientific_name, population: req.body.population, conservation_status: req.body.conservation_status }
    console.log("In the server from the url - the species id", speciesId);
    console.log("In the server, from the react - the species to be edited", updatedSpecies);
    // UPDATE species SET population = "something" WHERE id="16";
    const query = `UPDATE species SET common_name=$1, scientific_name=$2, population=$3, conservation_status=$4 WHERE id=${speciesId} RETURNING *`;
    const values = [updatedSpecies.common_name, updatedSpecies.scientific_name, updatedSpecies.population, updatedSpecies.conservation_status];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on http://localhost:${PORT}`);
});