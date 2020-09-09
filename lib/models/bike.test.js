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


  it('finds a bike by id', async() => {
    const bike = await Bike.insert({
      bike: 'Le Champion',
      brand: 'Motobecane',
      miles: 323,
      color: 'silver'
    });

    const foundBike = await Bike.findById(bike.id);

    expect(foundBike).toEqual({
      id: bike.id,
      bike: 'Le Champion',
      brand: 'Motobecane',
      miles: 323,
      color: 'silver'
    });
  });

  it('returns null if invalid id passed', async() => {
    const bike = await Bike.findById(100);

    expect(bike).toEqual(null);
  });

  it('finds all bikes', async() => {
    await Promise.all([
      Bike.insert({
        bike: 'Le Champion',
        brand: 'Motobecane',
        miles: 323,
        color: 'silver'
      }),
      Bike.insert({
        bike: 'Big Red',
        brand: 'Mongoose',
        miles: 36,
        color: 'red'
      }),
      Bike.insert({
        bike: 'Mountain Roadster',
        brand: 'Motobecane',
        miles: 123,
        color: 'black'
      }),
      Bike.insert({
        bike: 'Spirit',
        brand: 'Giant',
        miles: 532,
        color: 'yellow'
      })
    ]);

    const bikes = await Bike.find();

    expect(bikes).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        bike: 'Le Champion',
        brand: 'Motobecane',
        miles: 323,
        color: 'silver'
      },
      {
        id: expect.any(String),
        bike: 'Big Red',
        brand: 'Mongoose',
        miles: 36,
        color: 'red'
      },
      {
        id: expect.any(String),
        bike: 'Mountain Roadster',
        brand: 'Motobecane',
        miles: 123,
        color: 'black'
      },
      {
        id: expect.any(String),
        bike: 'Spirit',
        brand: 'Giant',
        miles: 532,
        color: 'yellow'
      }
    ]));
  });

  it('updates a row by id', async() => {
    const createdBike = await Bike.insert({
      bike: 'Spirit',
      brand: 'Giant',
      miles: 532,
      color: 'yellow'
    });

    const updatedBike = await Bike.update(createdBike.id, {
      bike: 'Spirit Improved',
      brand: 'Giant',
      miles: 545,
      color: 'green'
    });

    expect(updatedBike).toEqual({
      id: createdBike.id,
      bike: 'Spirit Improved',
      brand: 'Giant',
      miles: 545,
      color: 'green'
    });
  });

  it('deletes a row by id', async () => {
    const createdBike = await Bike.insert({
      bike: 'Big Red',
      brand: 'Mongoose',
      miles: 36,
      color: 'red'
    });

    await Bike.insert({
      bike: 'Spirit',
      brand: 'Giant',
      miles: 532,
      color: 'yellow'
    });

    const deletedBike = await Bike.delete(createdBike.id);

    expect(deletedBike).toEqual({
      id: createdBike.id,
      bike: 'Big Red',
      brand: 'Mongoose',
      miles: 36,
      color: 'red'
    });

    const bikes = await Bike.find();

    expect(bikes).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        bike: 'Spirit',
        brand: 'Giant',
        miles: 532,
        color: 'yellow'
      }
    ]));
  });
});
