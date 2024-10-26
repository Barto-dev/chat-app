'use client';

import { useWorkspaceId } from '@/app/hooks/useWorkspaceId';
import { useGetWorkspaceById } from '@/features/workspaces/api/useGetWorkspaceById';

const WorkspacePage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaceById({ id: workspaceId });
  return <div>{JSON.stringify(data)}</div>;
};

export default WorkspacePage;
