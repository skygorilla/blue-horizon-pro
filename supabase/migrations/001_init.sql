-- 001_init.sql: initialize core schema for Blue Horizon Pro

-- Users with role-based access control
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  role text not null check (role in ('captain','chef','hostess','manager','crew')),
  created_at timestamp with time zone default now()
);

-- Guest types reference table
create table if not exists guest_types (
  code text primary key,
  name text not null,
  icon text not null,
  meal_presets text[] not null,
  dietary_tags text[] default '{}'
);

-- Recipes master table
create table if not exists recipes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  cuisine text,
  meal_type text,
  instructions text,
  prep_time_minutes integer,
  servings integer not null,
  created_by uuid references users(id),
  created_at timestamp with time zone default now()
);

-- Ingredients catalog
create table if not exists ingredients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  quantity_available numeric default 0,
  unit text,
  price_per_unit numeric default 0,
  created_at timestamp with time zone default now()
);

-- Join table for recipe ingredients
create table if not exists recipe_ingredients (
  recipe_id uuid references recipes(id) on delete cascade,
  ingredient_id uuid references ingredients(id),
  quantity numeric not null,
  unit text not null,
  primary key (recipe_id, ingredient_id)
);
