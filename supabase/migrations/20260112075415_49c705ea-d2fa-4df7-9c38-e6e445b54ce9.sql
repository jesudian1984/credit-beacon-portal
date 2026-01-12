-- Create a leads table for quick apply form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  monthly_salary NUMERIC NOT NULL,
  existing_emi NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to create a lead (public form)
CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Policy: Only admins can view leads
CREATE POLICY "Admins can view all leads" 
ON public.leads 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Only admins can update leads
CREATE POLICY "Admins can update leads" 
ON public.leads 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Only admins can delete leads
CREATE POLICY "Admins can delete leads" 
ON public.leads 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));