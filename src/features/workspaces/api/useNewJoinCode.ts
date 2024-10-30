import { useMutation } from 'convex/react';

import { useApiMutation } from '@/hooks/useApiMutation';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type RequestType = {
  workspaceId: Id<'workspaces'>;
};
type ResponseType = Id<'workspaces'> | null;

export const useNewJoinCode = () => {
  const mutation = useMutation(api.workspaces.newJoinCode);
  return useApiMutation<RequestType, ResponseType>(mutation);
};
