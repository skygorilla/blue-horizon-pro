-- Create system_status table to store application status report content
CREATE TABLE IF NOT EXISTS public.system_status (
  id serial PRIMARY KEY,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Trigger to update updated_at on modification
CREATE OR REPLACE FUNCTION public.trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_on_system_status ON public.system_status;
CREATE TRIGGER set_updated_at_on_system_status
  BEFORE UPDATE ON public.system_status
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_updated_at();
