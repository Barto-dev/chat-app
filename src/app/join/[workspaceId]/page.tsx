'use client';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useGetPublicInfo } from '@/features/workspaces/api/useGetPublicInfo';
import { useJoinWorkspace } from '@/features/workspaces/api/useJoinWorkspace';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

const JoinPage = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const [joinCode, setJoinCode] = useState('');
  const { data: workspace, isLoading } = useGetPublicInfo({ id: workspaceId });
  const { mutate, isPending } = useJoinWorkspace();

  useEffect(() => {
    if (workspace?.isMember) {
      router.replace(`/workspace/${workspaceId}`);
    }
  }, [router, workspace, workspaceId]);

  if (isLoading) {
    return (
      <div className="h-full flex-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleCompete = async () => {
    await mutate(
      {
        workspaceId,
        joinCode,
      },
      {
        onSuccess: (workspaceId) => router.replace(`/workspace/${workspaceId}`),
        onError: () => toast.error('Failed to join workspace'),
      },
    );
  };

  return (
    <div className="h-full flex-center flex-col gap-y-8 bg-white p-8 rounded-lg shadow-md">
      <Image
        src="/logo.svg"
        alt="logo"
        width={60}
        height={60}
      />
      <div className="flex-center flex-col gap-y-4 max-w-md">
        <div className="flex-center flex-col gap-y-2">
          <h1 className="text-2xl font-bold">Join {workspace?.name}</h1>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>

        <InputOTP
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          maxLength={6}
          value={joinCode}
          onChange={(value) => setJoinCode(value)}
          onComplete={handleCompete}
          disabled={isPending}
        >
          <InputOTPGroup className="capitalize">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex gap-x-4">
        <Button
          className="lg"
          variant="outline"
          asChild
        >
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
