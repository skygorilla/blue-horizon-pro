
import { ReactNode, FC } from 'react';
import { useAuth } from '@/contexts/useAuth';
import { useNavigate } from 'react-router-dom';

interface RequireRolesProps {
  roles: string[];
  children: ReactNode;
}

const RequireRoles: FC<RequireRolesProps> = ({ roles, children }) => {
  const { user, activeRole } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }
  if (!activeRole || !roles.includes(activeRole)) {
    navigate('/not-authorized');
    return null;
  }
  return <>{children}</>;
};

export default RequireRoles;
