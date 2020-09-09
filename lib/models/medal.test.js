const fs = require('fs');
const pool = require('../utils/pool');
const Medal = require('./medal');

describe('Medal model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new medal in the database', async() => {
    const createdMedal = await Medal.insert({
      race: 'Portland Marathon',
      year: 2019,
      miles: 26,
      on_road: true
    });

    const { rows } = await pool.query(
      'SELECT * FROM medals WHERE id = $1',
      [createdMedal.id]
    );

    expect(rows[0]).toEqual(createdMedal);
  });

  it('finds a medal by id', async() => {
    const medal = await Medal.insert({
      race: 'Portland Marathon',
      year: 2019,
      miles: 26,
      on_road: true
    });

    const foundMedal = await Medal.findById(medal.id);

    expect(foundMedal).toEqual({
      id: medal.id,
      race: 'Portland Marathon',
      year: 2019,
      miles: 26,
      on_road: true
    });
  });

  it('returns null if invalid id passed', async() => {
    const medal = await Medal.findById(25);

    expect(medal).toEqual(null);
  });

  it('finds all plants', async() => {
    await Promise.all([
      Medal.insert({
        race: 'Portland Marathon',
        year: 2019,
        miles: 26,
        on_road: true
      }),
      Medal.insert({
        race: 'Forest Park Half',
        year: 2015,
        miles: 13,
        on_road: false
      }),
      Medal.insert({
        race: 'Tillamook Burn',
        year: 2018,
        miles: 24,
        on_road: false
      }),
      Medal.insert({
        race: 'Rock and Roll Las Vegas',
        year: 2017,
        miles: 26,
        on_road: true
      })
    ]);

    const medals = await Medal.find();

    expect(medals).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        race: 'Portland Marathon',
        year: 2019,
        miles: 26,
        on_road: true
      },
      {
        id: expect.any(String),
        race: 'Forest Park Half',
        year: 2015,
        miles: 13,
        on_road: false
      },
      {
        id: expect.any(String),
        race: 'Tillamook Burn',
        year: 2018,
        miles: 24,
        on_road: false
      },
      {
        id: expect.any(String),
        race: 'Rock and Roll Las Vegas',
        year: 2017,
        miles: 26,
        on_road: true
      }
    ]));
  });

  it('updates a row by id', async() => {
    const createdMedal = await Medal.insert({
      race: 'Tillamook Burn',
      year: 2018,
      miles: 24,
      on_road: false
    });

    const updatedMedal = await Medal.update(createdMedal.id, {
      race: 'Tillamook Burn',
      year: 2017,
      miles: 25,
      on_road: false
    });

    expect(updatedMedal).toEqual({
      id: createdMedal.id,
      race: 'Tillamook Burn',
      year: 2017,
      miles: 25,
      on_road: false
    });
  });

  it('deletes a row by id', async() => {
    const createdMedal = await Medal.insert({
      race: 'Tillamook Burn',
      year: 2017,
      miles: 25,
      on_road: false
    });

    await Medal.insert({
      race: 'Rock and Roll Las Vegas',
      year: 2017,
      miles: 26,
      on_road: true
    });

    const deletedMedal = await Medal.delete(createdMedal.id);

    expect(deletedMedal).toEqual({
      id: createdMedal.id,
      race: 'Tillamook Burn',
      year: 2017,
      miles: 25,
      on_road: false
    });

    const medals = await Medal.find();

    expect(medals).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        race: 'Rock and Roll Las Vegas',
        year: 2017,
        miles: 26,
        on_road: true
      }
    ]));
  });
});
