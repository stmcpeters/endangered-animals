# Wildlife Watch

## Overview
Wildlife Watch is a simple, user-friendly web application that allows you to view, add, edit, and delete endangered species tracked around the United States. Currently, we have 3 individuals from 3 different species. We are tracking Lou the Hawaiian Monk Seal, Benji the Florida Panther, and Luna the Mexican Wolf.Add your own sightings of these animals, or feel free to add a new individual you find! This project was created for week 10's Techtonica program assignment. The system uses a React frontend and a Node.js backend to create an interactive UI.

## Demo
![Wildlife Watch](client/src/assets/demo.gif)

## Features
- View a list of species, individuals and sightings
- Add new species, individuals and sightings
- Edit species, individuals and sightings
- Delete species, individuals and sightings
- Responsive design built with React
- Real-time data synchronization between frontend and backend

## Technologies
### Frontend
- React: JavaScript library for building responsive user interfaces
- React Bootstrap: Styling and layout of the app
- Fetch API: Makes HTTP requests to the backend <br>
### Backend
- Express.js: A Node.js framework for setting up the server and handling HTTP requests
- Node.js: JavaScript environment used to run the Express server
- Cors: Middleware to handle Cross-Origin Resource Sharing
- Dotenv: Hides sensitive environment variables
- PostgreSQL: Database management system

## Installation
### Pre Requisites 
- Node.js (which includes npm): [Download Node.js](https://nodejs.org/en/download/package-manager)
- Git (for cloning the repository): [Download Git](https://git-scm.com/downloads)

1. Clone the repo <br>
`git clone https://github.com/stmcpeters/endangered-animals`<br>
`cd endangered-animals` 
2. Set up the backend
- Navigate to the `server` folder
- Install backend dependencies: `npm install`
- Create a `.env` file in the server directory and add your environment variables (see `.env-sample` for example)
- Import and configure `dotenv` in your `server.js` file: <br>
`import dotenv from 'dotenv';` <br>
`dotenv.config();` <br>
3. There are two ways to restore the DB dump file the project already contains: 

A- If you have postgres set up postgres with an User:  
 * just run the command `psql -U postgres -f db.sql`. Make sure that you have your Postgres password on hand. The psql console will ask for your password. 

B- If your initial configuration of postgres doesn't require a User:
* just run the command `psql -f db.sql`

7. Inside your server folder, open the file `.env.example` and copy the correct option for your configuation found there to your new .env file. 

Here is what your `.env` might look like:

```
DB_URI="postgresql://localhost/animals"
``` 
For this template, the name of your db should be `animals`.

⚠️ If you don't see a `animals` db, you can create one. From the terminal, navigate to the psql command line with `psql` and type `create database animals;` - don't forget the semicolon!! ⚠️

- Start the server using: `npm start`

4. Set up the frontend:
- Navigate to the `client` folder
- Install dependencies: `npm install`
- Start the React development server using `npm run dev`

## API Endpoints
### Sightings
- GET `/api/sightings`: Fetches all sightings
- GET `/api/sightings/:id`: Fetches a specific sighting by ID
- POST `/api/sightings`: Creates a new sighting
- PUT `/api/sightings/:id`: Updates an existing sightings
- DELETE `/api/sightings/:id`: Deletes a sighting
### Individuals
- GET `/api/individuals`: Fetches all individuals
- GET `/api/individuals/:id`: Fetches a specific individual by ID
- POST `/api/individuals`: Creates a new individual
- PUT `/api/individuals/:id`: Updates an existing individual
- DELETE `/api/individuals/:id`: Deletes an individual
### Species
- GET `/api/species`: Fetches all species
- GET `/api/species/:id`: Fetches a specific species by ID
- POST `/api/species`: Creates a new species
- PUT `/api/species/:id`: Updates an existing species
- DELETE `/api/species/:id`: Deletes a species

## Stretch Goals/Help Wanted
- Search bar/filter sightings or individuals by health status, date, conservation status, etc
- Ability to favorite individuals
- Implement testing for frontend components

## Contributing
Contributions are welcomed to this project! If you have an idea for a new feature or a bug fix, please open an issue or a pull request.

## License
This project is licensed under the MIT License.
