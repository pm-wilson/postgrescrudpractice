const fs = require('fs');
const pool = require('../utils/pool');
const Bike = require('./bike');

describe('Bike model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new bike in the database', async() => {
    const createdBike = await Bike.insert({
      bike: 'Le Champion',
      brand: 'Motobecane',
      miles: 323,
      color: 'silver'
    });

    const { rows } = await pool.query(
      'SELECT * FROM bikes WHERE id = $1',
      [createdBike.id]
    );

    expect(rows[0]).toEqual(createdBike);
  });
});