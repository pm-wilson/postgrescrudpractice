const fs = require('fs');
const pool = require('../utils/pool');
const Deck = require('./deck');

describe('Deck model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new deck and adds it to the database', async() => {
    const createdDeck = await Deck.insert({
      deck: 'Patrick',
      colors: 'WUBRG',
      format: 'Commander',
      rank: 95
    });

    const { rows } = await pool.query(
      'SELECT * FROM decks WHERE id = $1',
      [createdDeck.id]
    );

    expect(rows[0]).toEqual(createdDeck);
  });

  it('finds a deck by id', async() => {
    const cactus = await Deck.insert({
      deck: 'Patrick',
      colors: 'WUBRG',
      format: 'Commander',
      rank: 95
    });

    const foundCactus = await Deck.findById(cactus.id);

    expect(foundCactus).toEqual({
      id: cactus.id,
      deck: 'Patrick',
      colors: 'WUBRG',
      format: 'Commander',
      rank: 95
    });
  });





});
