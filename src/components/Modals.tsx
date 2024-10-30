'use client';

import { CreateChannelModal } from '@/features/channels/components/CreateChannelModal';
import { CreateWorkspaceModal } from '@/features/workspaces/components/CreateWorkspaceModal';
import { useIsBrowser } from '@/hooks/useIsBrowser';

export const Modals = () => {
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return null;
  }

  return (
    <>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </>
  );
};
