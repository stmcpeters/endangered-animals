const request = require('supertest');
const app = require('../client/src/App.jsx'); // Import your Express app

// test to return all sightings route 
describe('Sightings API', () => {
  describe('/api/sightings GET', () => {
    it('should return all sightings', async () => {
      const response = await request(app).get('/api/sightings');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('individual_id');
    });
  });

  // test for creating new sighting route
  describe('/api/sightings POST', () => {
    // fake data to simulate updating new sighting
    const validData = {
      individual_id: '123',
      individuals_nickname: 'Test Nickname',
      sighting_date: '2023-01-01',
      location: 'Test Location',
      healthy: true,
      researcher_email: 'test@example.com'
    };

        // simulates fetching data from database
    it('should create a new sighting', async () => {
      const response = await request(app).post('/api/sightings').send(validData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.individual_id).toBe(validData.individual_id);
    });
  });

  // test for deleting a sighting
  describe('/api/sightings/:id DELETE', () => {
        // simulates fetching data from database
    it('should delete a sighting', async () => {
      const response = await request(app).delete('/api/sightings/1');

      expect(response.status).toBe(200);
      expect(response.body).toBeNull();
    });
  });

  // test for updating a sighting
  describe('/api/sightings/:id PUT', () => {
    // fake data to simulate updating new sighting
    const updateData = {
      individual_id: '456',
      individuals_nickname: 'Updated Nickname',
      sighting_date: '2023-02-01',
      location: 'Updated Location',
      healthy: false,
      researcher_email: 'updated@example.com'
    };

    // simulates fetching data from database
    it('should update a sighting', async () => {
      const response = await request(app)
        .put('/api/sightings/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.individual_id).toBe(updateData.individual_id);
    });
  });
});
