-- Add explicit policies for user_roles table to prevent unauthorized role manipulation

-- Deny direct role creation (only through trigger)
CREATE POLICY "Roles created by system only"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (false);

-- Only admins can update roles
CREATE POLICY "Admins can update roles"
  ON public.user_roles
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete roles
CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));