const pool = require('../utils/pool');

class Shoe {
  id;
  shoe;
  brand;
  miles;
  for_trails;

  constructor(row) {
    this.id = row.id;
    this.shoe = row.shoe;
    this.brand = row.brand;
    this.miles = row.miles;
    this.for_trails = row.for_trails;
  }

  static async insert(shoe) {
    const { rows } = await pool.query(
      'INSERT INTO shoes (shoe, brand, miles, for_trails) VALUES ($1, $2, $3, $4) RETURNING *',
      [shoe.shoe, shoe.brand, shoe.miles, shoe.for_trails]
    );

    return new Shoe(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM shoes WHERE id = $1',
      [id]
    );

    if(!rows[0]) return null;
    return new Shoe(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM shoes'
    );

    return rows.map(row => new Shoe(row));
  }

  static async update(id, updatedShoe) {
    const { rows } = await pool.query(
      `UPDATE shoes SET
      shoe = $1,
      brand = $2,
      miles = $3,
      for_trails = $4
      WHERE id = $5
      RETURNING *`,
      [updatedShoe.shoe, updatedShoe.brand, updatedShoe.miles, updatedShoe.for_trails, id]
    );

    return new Shoe(rows[0]);
  }


}

module.exports = Shoe;