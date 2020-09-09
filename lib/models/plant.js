const pool = require('../utils/pool');

class Plant {
  id;
  plant_type;
  category;
  water_freq;
  plant_description;

  constructor(row) {
    this.id = row.id;
    this.plant_type = row.plant_type;
    this.category = row.category;
    this.water_freq = row.water_freq;
    this.plant_description = row.plant_description;
  }

  static async insert(plant) {
    const { rows } = await pool.query(
      'INSERT INTO plants (plant_type, category, water_freq, plant_description) VALUES ($1, $2, $3, $4) RETURNING *',
      [plant.plant_type, plant.category, plant.water_freq, plant.plant_description]
    );

    return new Plant(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * from plants WHERE id = $1',
      [id]
    );

    if(!rows[0]) return null;
    return new Plant (rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * from plants'
    );

    return rows.map(row => new Plant(row));
  }

  static async update(id, updatedPlant) {
    const { rows } = await pool.query(
      `UPDATE plants
      SET plant_type=$1,
      category = $2,
      water_freq = $3,
      plant_description = $4
      WHERE id = $5
      RETURNING *
      `,
      [updatedPlant.plant_type, updatedPlant.category, updatedPlant.water_freq, updatedPlant.plant_description, id]
    );

    return new Plant(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM plants WHERE id = $1 RETURNING *',
      [id]
    );

    return new Plant(rows[0]);
  }
}

module.exports = Plant;
