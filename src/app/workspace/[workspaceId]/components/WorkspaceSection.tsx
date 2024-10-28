import { PlusIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useToggle } from 'react-use';

import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WorkspaceSectionProps {
  label: string;
  hint?: string;
  children: ReactNode;
  onNew?: () => void;
}

export const WorkspaceSection = ({
  label,
  hint,
  children,
  onNew,
}: WorkspaceSectionProps) => {
  const [on, toggle] = useToggle(true);
  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant="transparent"
          className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
          onClick={toggle}
        >
          <FaCaretDown
            className={cn('size-4 transition-transform', on && '-rotate-90')}
          />
        </Button>
        <Button
          size="sm"
          variant="transparent"
          className="group px-1.5 text-sm text-[#f9edffcc] h-7 justify-start overflow-hidden items-center"
        >
          <span className="text-sm font-semibold truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint || ''}>
            <Button
              size="iconSm"
              variant="transparent"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0"
              onClick={onNew}
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};
