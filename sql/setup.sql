DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS decks;

CREATE TABLE plants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  plant_type TEXT NOT NULL,
  category TEXT NOT NULL,
  water_freq INT,
  plant_description TEXT
);

CREATE TABLE decks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  player TEXT,
  colors VARCHAR(5),
  format TEXT,
  rank INT
)