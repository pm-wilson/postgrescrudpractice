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


}

module.exports = Plant;
