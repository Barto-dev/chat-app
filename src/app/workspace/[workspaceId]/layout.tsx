'use client';

import { ReactNode } from 'react';

import { Toolbar } from './components/Toolbar';

interface WorkspaceLayoutProps {
  children: ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      {children}
    </div>
  );
};

export default WorkspaceIdLayout;
