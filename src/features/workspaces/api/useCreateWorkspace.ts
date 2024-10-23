import { useMutation } from 'convex/react';

import { useApiMutation } from '@/hooks/useApiMutation';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type RequestType = {
  name: string;
};
type ResponseType = Id<'workspaces'> | null;

export const useCreateWorkspace = () => {
  const mutation = useMutation(api.workspaces.create);
  return useApiMutation<RequestType, ResponseType>(mutation);
};
