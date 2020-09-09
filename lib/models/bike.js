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
}

module.exports = Bike;
