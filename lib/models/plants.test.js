const fs = require('fs');
const pool = require('../utils/pool');
const Plant = require('./plant');

describe('Plant model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new plant in the database', async() => {
    const createdPlant = await Plant.insert({
      plant_type: 'Saguaro Cactus',
      category: 'succulent',
      water_freq: 1,
      plant_description: 'Largest cactus in the US'
    });

    const { rows } = await pool.query(
      'SELECT * FROM plants WHERE id = $1',
      [createdPlant.id]
    );

    expect(rows[0]).toEqual(createdPlant);
  });

  it('finds a plant by id', async () => {
    const cactus = await Plant.insert({
      plant_type: 'Saguaro Cactus',
      category: 'succulent',
      water_freq: 1,
      plant_description: 'Largest cactus in the US'
    });

    const foundCactus = await Plant.findById(cactus.id);

    expect(foundCactus).toEqual({
      id: cactus.id,
      plant_type: 'Saguaro Cactus',
      category: 'succulent',
      water_freq: 1,
      plant_description: 'Largest cactus in the US'
    });
  });
});

