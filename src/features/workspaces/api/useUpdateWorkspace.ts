import { useMutation } from 'convex/react';

import { useApiMutation } from '@/hooks/useApiMutation';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type RequestType = {
  id: Id<'workspaces'>;
  name: string;
};
type ResponseType = Id<'workspaces'> | null;

export const useUpdateWorkspace = () => {
  const mutation = useMutation(api.workspaces.update);
  return useApiMutation<RequestType, ResponseType>(mutation);
};
