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

// //A put request - Update a student 
// app.put('/api/students/:studentId', async (req, res) =>{
//     //console.log(req.params);
//     //This will be the id that I want to find in the DB - the student to be updated
//     const studentId = req.params.studentId
//     const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname, iscurrent: req.body.is_current}
//     console.log("In the server from the url - the student id", studentId);
//     console.log("In the server, from the react - the student to be edited", updatedStudent);
//     // UPDATE students SET lastname = "something" WHERE id="16";
//     const query = `UPDATE students SET firstname=$1, lastname=$2, is_current=$3 WHERE id=${studentId} RETURNING *`;
//     const values = [updatedStudent.firstname, updatedStudent.lastname, updatedStudent.iscurrent];
//     try {
//       const updated = await db.query(query, values);
//       console.log(updated.rows[0]);
//       res.send(updated.rows[0]);
  
//     }catch(e){
//       console.log(e);
//       return res.status(400).json({e})
//     }
//   })

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on http://localhost:${PORT}`);
});