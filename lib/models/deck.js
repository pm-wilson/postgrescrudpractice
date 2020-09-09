const pool = require('../utils/pool');

class Deck {
  id;
  player;
  colors;
  format;
  rank;

  constructor(row) {
    this.id = row.id;
    this.player = row.player;
    this.colors = row.colors;
    this.format = row.format;
    this.rank = row.rank;
  }

  static async insert(deck) {
    const { rows } = await pool.query(
      'INSERT INTO decks (player, colors, format, rank) VALUES ($1, $2, $3, $4) RETURNING *',
      [deck.player, deck.colors, deck.format, deck.rank]
    );

    return new Deck(rows[0]);
  }
}

module.exports = Deck;
