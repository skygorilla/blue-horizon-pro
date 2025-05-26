import React from 'react';

interface AdminPasswordProtectProps {
  children: React.ReactNode;
}

const AdminPasswordProtect: React.FC<AdminPasswordProtectProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AdminPasswordProtect;