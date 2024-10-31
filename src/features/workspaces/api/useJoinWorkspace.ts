import { useMutation } from 'convex/react';

import { useApiMutation } from '@/hooks/useApiMutation';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type RequestType = {
  workspaceId: Id<'workspaces'>;
  joinCode: string;
};
type ResponseType = Id<'workspaces'> | null;

export const useJoinWorkspace = () => {
  const mutation = useMutation(api.workspaces.join);
  return useApiMutation<RequestType, ResponseType>(mutation);
};
