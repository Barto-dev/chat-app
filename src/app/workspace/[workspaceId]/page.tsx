'use client';

import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useGetWorkspaceById } from '@/features/workspaces/api/useGetWorkspaceById';

const WorkspacePage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaceById({ id: workspaceId });
  const t = data;

  return <div>T</div>;
};

export default WorkspacePage;
