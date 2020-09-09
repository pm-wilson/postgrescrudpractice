const fs = require('fs');
const pool = require('../utils/pool');
const Shoe = require('./shoe');

describe('Shoe model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new shoe in the database', async() => {
    const createdShoe = await Shoe.insert({
      shoe: 'Lone Peak II',
      brand: 'Altra',
      miles: 7,
      for_trails: true
    });

    const { rows } = await pool.query(
      'SELECT * FROM shoes WHERE id = $1',
      [createdShoe.id]
    );

    expect(rows[0]).toEqual(createdShoe);
  });

  it('finds a shoe by id', async() => {
    const shoe = await Shoe.insert({
      shoe: 'Lone Peak II',
      brand: 'Altra',
      miles: 7,
      for_trails: true
    });

    const foundShoe = await Shoe.findById(shoe.id);

    expect(foundShoe).toEqual({
      id: shoe.id,
      shoe: 'Lone Peak II',
      brand: 'Altra',
      miles: 7,
      for_trails: true
    });
  });

  it('returns null if invalid id passed', async() => {
    const shoe = await Shoe.findById(100);

    expect(shoe).toEqual(null);
  });

  it('finds all plants', async () => {
    await Promise.all([
      Shoe.insert({
        shoe: 'Lone Peak II',
        brand: 'Altra',
        miles: 7,
        for_trails: true
      }),
      Shoe.insert({
        shoe: 'Street Walkers',
        brand: 'Dr. Martin',
        miles: 37,
        for_trails: false
      }),
      Shoe.insert({
        shoe: 'Sandals',
        brand: 'Birkenstock',
        miles: 56,
        for_trails: false
      }),
      Shoe.insert({
        shoe: 'Paradigm 5',
        brand: 'Altra',
        miles: 129,
        for_trails: true
      })
    ]);

    const plants = await Shoe.find();

    expect(plants).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        shoe: 'Lone Peak II',
        brand: 'Altra',
        miles: 7,
        for_trails: true
      },
      {
        id: expect.any(String),
        shoe: 'Street Walkers',
        brand: 'Dr. Martin',
        miles: 37,
        for_trails: false
      },
      {
        id: expect.any(String),
        shoe: 'Sandals',
        brand: 'Birkenstock',
        miles: 56,
        for_trails: false
      },
      {
        id: expect.any(String),
        shoe: 'Paradigm 5',
        brand: 'Altra',
        miles: 129,
        for_trails: true
      }
    ]));
  });



});
