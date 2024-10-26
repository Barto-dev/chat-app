'use client';

import { ReactNode } from 'react';

import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';

interface WorkspaceLayoutProps {
  children: ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-theme(spacing.toolbar-height))]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
