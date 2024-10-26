'use client';

import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useGetWorkspaceById } from '@/features/workspaces/api/useGetWorkspaceById';

const WorkspacePage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaceById({ id: workspaceId });
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
};

export default WorkspacePage;
