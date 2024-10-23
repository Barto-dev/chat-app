'use client';

import { CreateWorkspaceModal } from '@/features/workspaces/components/CreateWorkspaceModal';
import { useIsBrowser } from '@/hooks/useIsBrowser';

export const Modals = () => {
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return null;
  }

  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
