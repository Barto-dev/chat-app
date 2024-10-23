'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { UserButton } from '@/features/auth/components/UserButton';
import { useGetWorkspaces } from '@/features/workspaces/api/useGetWorkspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/useCreateModal';

const Home = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default Home;
