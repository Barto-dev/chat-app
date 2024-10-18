'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { Loader, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

export const UserButton = () => {
  const router = useRouter();
  const { data, isLoading } = useCurrentUser();
  const { signOut } = useAuthActions();

  const onSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!data) {
    return null;
  }

  const avatarFallback = data.name?.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage
            alt={data.name}
            src={data.image}
          />
          <AvatarFallback className="bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-60"
      >
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="size-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
