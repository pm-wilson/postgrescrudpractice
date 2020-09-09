const pool = require('../utils/pool');

class Medal {
  id;
  race;
  year;
  miles;
  on_road;

  constructor(row) {
    this.id = row.id;
    this.race = row.race;
    this.year = row.year;
    this.miles = row.miles;
    this.on_road = row.on_road;
  }

  static async insert(medal) {
    const { rows } = await pool.query(
      'INSERT INTO medals (race, year, miles, on_road) VALUES ($1, $2, $3, $4) RETURNING *',
      [medal.race, medal.year, medal.miles, medal.on_road]
    );

    return new Medal(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * from medals WHERE id = $1',
      [id]
    );

    if(!rows[0]) return null;
    return new Medal(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * from medals'
    );

    return rows.map(row => new Medal(row));
  }

  static async update(id, updatedMedal) {
    const { rows } = await pool.query(
      `UPDATE medals
      SET race = $1,
      year = $2,
      miles = $3,
      on_road = $4
      WHERE id = $5
      RETURNING *
      `,
      [updatedMedal.race, updatedMedal.year, updatedMedal.miles, updatedMedal.on_road, id]
    );

    return new Medal(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM medals WHERE id = $1 RETURNING *',
      [id]
    );

    return new Medal(rows[0]);
  }



}

module.exports = Medal;
