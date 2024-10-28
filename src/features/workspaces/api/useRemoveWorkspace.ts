import { useMutation } from 'convex/react';

import { useApiMutation } from '@/hooks/useApiMutation';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type RequestType = {
  id: Id<'workspaces'>;
};
type ResponseType = Id<'workspaces'> | null;

export const useRemoveWorkspace = () => {
  const mutation = useMutation(api.workspaces.remove);
  return useApiMutation<RequestType, ResponseType>(mutation);
};
