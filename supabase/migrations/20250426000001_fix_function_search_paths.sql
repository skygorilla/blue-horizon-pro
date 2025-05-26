-- Set fixed search_path for recipe_in_stock function
ALTER FUNCTION public.recipe_in_stock()
SET search_path = public, pg_catalog;
-- Add other required schemas like , auth, extensions if needed

-- Set fixed search_path for populate_booking_weeks function
ALTER FUNCTION public.populate_booking_weeks()
SET search_path = public, pg_catalog;
-- Add other required schemas like , auth, extensions if needed
