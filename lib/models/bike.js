const pool = require('../utils/pool');

class Bike {
  id;
  bike;
  brand;
  miles;
  color;

  constructor(row) {
    this.id = row.id;
    this.bike = row.bike;
    this.brand = row.brand;
    this.miles = row.miles;
    this.color = row.color;
  }

  static async insert(bike) {
    const { rows } = await pool.query(
      'INSERT INTO bikes (bike, brand, miles, color) VALUES ($1, $2, $3, $4) RETURNING *',
      [bike.bike, bike.brand, bike.miles, bike.color]
    );

    return new Bike(rows[0]);
  }
  
  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * from bikes WHERE id = $1',
      [id]
    );

    if(!rows[0]) return null;
    return new Bike(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * from bikes'
    );

    return rows.map(row => new Bike(row));
  }

  static async update(id, updatedBike) {
    const { rows } = await pool.query(
      `UPDATE bikes
      SET bike = $1,
      brand = $2,
      miles = $3,
      color = $4
      WHERE id = $5
      RETURNING *
      `,
      [updatedBike.bike, updatedBike.brand, updatedBike.miles, updatedBike.color, id]
    );

    return new Bike(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM bikes WHERE id = $1 RETURNING *',
      [id]
    );

    return new Bike(rows[0]);
  }
}

module.exports = Bike;
