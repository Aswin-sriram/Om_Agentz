-- Enforce admin-only access to inquiries with a server-side role check
CREATE OR REPLACE FUNCTION public.has_role(role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' -> 'roles') ? role,
    (auth.jwt() -> 'app_metadata' ->> 'role') = role,
    FALSE
  );
$$;

DROP POLICY IF EXISTS "Authenticated users can view inquiries"
ON public.contact_inquiries;

CREATE POLICY "Admins can view inquiries"
ON public.contact_inquiries
FOR SELECT
TO authenticated
USING (public.has_role('admin'));
