import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface UseGetPublicInfo {
  id: Id<'workspaces'>;
}

// TODO: remove try catch
export const useGetPublicInfo = ({ id }: UseGetPublicInfo) => {
  try {
    const data = useQuery(api.workspaces.getPublicInfo, { id });
    return {
      data,
      isLoading: false,
    };
  } catch {
    return {
      data: null,
      isLoading: false,
    };
  }
};
