import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { getInitialLetter } from '@/lib/getInitialLetter';
import { cn } from '@/lib/utils';

import { Id } from '../../../../../convex/_generated/dataModel';

const userItemVariants = cva(
  'flex items-center justify-start gap-1.5 font-normal h-7 px-4 text-sm overflow-hidden whitespace-nowrap hover:bg-accent/10',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'text-[#481349] bg-white/90 hover:bg-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface UserItemProps {
  id: Id<'members'>;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>['variant'];
}

export const UserItem = ({
  id,
  label = 'Member',
  image,
  variant,
}: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  return (
    <Button
      asChild
      variant="transparent"
      className={cn(userItemVariants({ variant }))}
      size="sm"
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="size-5 mr-1">
          <AvatarImage src={image} />
          <AvatarFallback className="bg-sky-500 text-white text-xs">
            {getInitialLetter(label)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
