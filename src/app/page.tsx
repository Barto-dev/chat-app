'use client';

import { useAuthActions } from '@convex-dev/auth/react';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { signOut } = useAuthActions();

  const onSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <div>
      <Button
        onClick={onSignOut}
        type="button"
      >
        Sign out
      </Button>
      Logged in
    </div>
  );
}
