DROP TABLE IF EXISTS plants;

CREATE TABLE plants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  plant_type TEXT NOT NULL,
  category TEXT NOT NULL,
  water_freq INT,
  plant_description TEXT
);