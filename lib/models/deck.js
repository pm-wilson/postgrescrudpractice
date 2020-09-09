const pool = require('../utils/pool');

class Deck {
  id;
  deck;
  colors;
  format;
  rank;

  constructor(row) {
    this.id = row.id;
    this.deck = row.deck;
    this.colors = row.colors;
    this.format = row.format;
    this.rank = row.rank;
  }

  static async insert(deck) {
    const { rows } = await pool.query(
      'INSERT INTO decks (deck, colors, format, rank) VALUES ($1, $2, $3, $4) RETURNING *',
      [deck.deck, deck.colors, deck.format, deck.rank]
    );

    return new Deck(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * from decks WHERE id = $1',
      [id]
    );

    if(!rows[0]) return null;
    return new Deck(rows[0]);
  }
  





}

module.exports = Deck;
