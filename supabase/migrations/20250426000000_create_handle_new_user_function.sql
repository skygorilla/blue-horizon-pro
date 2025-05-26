-- Create the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = '';
AS $$
BEGIN
    -- Function logic to handle new user creation will go here.
    -- For example, you might want to insert a default profile
    -- or perform other setup tasks.
    
    -- Placeholder: Log the new user ID (requires appropriate permissions)
    -- RAISE LOG 'New user created with ID: %', NEW.id;

    RETURN NEW;
END;
$$;