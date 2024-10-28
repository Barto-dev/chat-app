import { type VariantProps, cva } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { IconType } from 'react-icons';

import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { cn } from '@/lib/utils';

const sidebarItemVariants = cva(
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

interface SidebarItemProps {
  id: string;
  label: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVariants>['variant'];
}

export const SidebarItem = ({
  id,
  label,
  icon: Icon,
  variant,
}: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();
  return (
    <Button
      asChild
      variant="transparent"
      className={cn(sidebarItemVariants({ variant }))}
      size="sm"
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
