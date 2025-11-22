'use client';

import { UserRole } from '@prisma/client';

import { useCurrentRole } from '@/hooks/use-current-role';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  // TODO: broaden to accept multiple roles; currently gates on a single exact match.
  if (role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
};
