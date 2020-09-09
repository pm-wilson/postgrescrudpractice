const fs = require('fs');
const pool = require('../utils/pool');
const Deck = require('./deck');

describe('Deck model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new deck and adds it to the database', async() => {
    const createdDeck = await Deck.insert({
      deck: 'Patrick Awesome Deck',
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
      deck: 'Patrick Awesome Deck',
      colors: 'WUBRG',
      format: 'Commander',
      rank: 95
    });

    const foundCactus = await Deck.findById(cactus.id);

    expect(foundCactus).toEqual({
      id: cactus.id,
      deck: 'Patrick Awesome Deck',
      colors: 'WUBRG',
      format: 'Commander',
      rank: 95
    });
  });

  it('returns null if invalid id passed', async() => {
    const deck = await Deck.findById(100);

    expect(deck).toEqual(null);
  });

  it('finds all decks', async() => {
    await Promise.all([
      Deck.insert({
        deck: 'Patrick Awesome Deck',
        colors: 'WUBRG',
        format: 'Commander',
        rank: 95
      }),
      Deck.insert({
        deck: 'Patrick Somewhat Less Awesome Deck',
        colors: 'UB',
        format: 'Casual',
        rank: 75
      }),
      Deck.insert({
        deck: 'Patrick Worst Deck',
        colors: 'WG',
        format: 'Casual',
        rank: 1
      }),
      Deck.insert({
        deck: 'Another Cool Deck',
        colors: 'B',
        format: 'Commander',
        rank: 78
      })
    ]);

    const decks = await Deck.find();

    expect(decks).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        deck: 'Patrick Awesome Deck',
        colors: 'WUBRG',
        format: 'Commander',
        rank: 95
      },
      {
        id: expect.any(String),
        deck: 'Patrick Somewhat Less Awesome Deck',
        colors: 'UB',
        format: 'Casual',
        rank: 75
      },
      {
        id: expect.any(String),
        deck: 'Patrick Worst Deck',
        colors: 'WG',
        format: 'Casual',
        rank: 1
      },
      {
        id: expect.any(String),
        deck: 'Another Cool Deck',
        colors: 'B',
        format: 'Commander',
        rank: 78
      }
    ]));
  });



});
