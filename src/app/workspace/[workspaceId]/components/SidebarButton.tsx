import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  isActive?: boolean;
}

export const SidebarButton = ({
  icon: Icon,
  label,
  isActive,
}: SidebarButtonProps) => {
  return (
    <div className="flex flex-col flex-center gap-y-0.5 group cursor-pointer">
      <Button
        variant="transparent"
        className={cn(
          'size-9 -2 group-hover:bg-accent/20',
          isActive && 'bg-accent/20',
        )}
      >
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-xs text-white group-hover:text-accent">
        {label}
      </span>
    </div>
  );
};