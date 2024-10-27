'use client';

import { ReactNode } from 'react';

import { WorkspaceSidebar } from '@/app/workspace/[workspaceId]/components/WorkspaceSidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

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
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="resize-workspace"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={20}
            className="bg-[#5E2C5F]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
