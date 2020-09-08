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

  it('returns null if invalid id passed', async () => {
    const plant = await Plant.findById(100);

    expect(plant).toEqual(null);
  });

  it('finds all plants', async () => {
    await Promise.all([
      Plant.insert({
        plant_type: 'Saguaro Cactus',
        category: 'succulent',
        water_freq: 1,
        plant_description: 'Largest cactus in the US'
      }),
      Plant.insert({
        plant_type: 'Western Red Cedar',
        category: 'tree',
        water_freq: 3,
        plant_description: 'A cedar tree'
      }),
      Plant.insert({
        plant_type: 'Venus Flytrap',
        category: 'carnivorous',
        water_freq: 10,
        plant_description: 'Can digest bugs'
      }),
      Plant.insert({
        plant_type: 'Bamboo',
        category: 'grass',
        water_freq: 9,
        plant_description: 'Evergreen perennial flowering plant'
      })
    ]);

    const plants = await Plant.find();

    expect(plants).toEqual(expect.arrayContaining([
      { 
        id: expect.any(String),
        plant_type: 'Saguaro Cactus',
        category: 'succulent',
        water_freq: 1,
        plant_description: 'Largest cactus in the US'
      },
      {
        id: expect.any(String),
        plant_type: 'Western Red Cedar',
        category: 'tree',
        water_freq: 3,
        plant_description: 'A cedar tree'
      },
      {
        id: expect.any(String),
        plant_type: 'Venus Flytrap',
        category: 'carnivorous',
        water_freq: 10,
        plant_description: 'Can digest bugs'
      },
      {
        id: expect.any(String),
        plant_type: 'Bamboo',
        category: 'grass',
        water_freq: 9,
        plant_description: 'Evergreen perennial flowering plant'
      }
    ]));
  });

  it('updates a row by id', async() => {
    const createdPlant = await Plant.insert({
      plant_type: 'Bamboo',
      category: 'grass',
      water_freq: 9,
      plant_description: 'Evergreen perennial flowering plant'
    });

    const updatedPlant = await Plant.update(createdPlant.id, {
      plant_type: 'Changed Bamboo',
      category: 'fast-growing',
      water_freq: 8,
      plant_description: 'Good for flooring'
    });

    expect(updatedPlant).toEqual({
      id: createdPlant.id,
      plant_type: 'Changed Bamboo',
      category: 'fast-growing',
      water_freq: 8,
      plant_description: 'Good for flooring'
    });
  });




});

