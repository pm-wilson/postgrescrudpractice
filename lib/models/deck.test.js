const fs = require('fs');
const pool = require('../utils/pool');
const Deck = require('./deck');

describe('Deck model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new deck and adds it to the database', async() => {
    const createdDeck = await Deck.insert({
      player: 'Patrick',
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



});
