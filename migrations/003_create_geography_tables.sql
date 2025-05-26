-- Migration: 003_create_geography_tables.sql
-- Create tables for global cuisine hierarchy

CREATE TABLE IF NOT EXISTS continents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  continent_id INTEGER NOT NULL REFERENCES continents(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  UNIQUE (name, country_id)
);

CREATE TABLE IF NOT EXISTS towns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  region_id INTEGER NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  UNIQUE (name, region_id)
);
