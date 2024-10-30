import { useMutation } from 'convex/react';

import { useApiMutation } from '@/hooks/useApiMutation';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type RequestType = {
  workspaceId: Id<'workspaces'>;
  name: string;
};
type ResponseType = Id<'channels'> | null;

export const useCreateChannel = () => {
  const mutation = useMutation(api.channels.create);
  return useApiMutation<RequestType, ResponseType>(mutation);
};
