import { Loader, TriangleAlert } from 'lucide-react';

import { WorkspaceHeader } from '@/app/workspace/[workspaceId]/components/WorkspaceHeader';
import { useCurrentMember } from '@/features/membets/api/useCurrentMember';
import { useGetWorkspaceById } from '@/features/workspaces/api/useGetWorkspaceById';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: memberData, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspaceData, isLoading: workspaceLoading } =
    useGetWorkspaceById({ id: workspaceId });

  if (memberLoading || workspaceLoading) {
    return (
      <div className="flex-center flex-col h-full">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!memberData || !workspaceData) {
    return (
      <div className="flex-center gap-y-2 flex-col h-full text-white">
        <TriangleAlert className="size-5" />
        <p className="text-sm">Workspace not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <WorkspaceHeader
        workspace={workspaceData}
        isAdmin={memberData.role === 'admin'}
      />
    </div>
  );
};
