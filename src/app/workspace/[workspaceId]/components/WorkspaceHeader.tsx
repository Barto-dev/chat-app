import { ChevronDown, ListFilter, SquarePen } from 'lucide-react';
import { useState } from 'react';

import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitialLetter } from '@/lib/getInitialLetter';

import { Doc } from '../../../../../convex/_generated/dataModel';
import { PreferencesModal } from './PreferencesModal';

interface WorkspaceHeaderProps {
  workspace: Doc<'workspaces'>;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({
  isAdmin,
  workspace,
}: WorkspaceHeaderProps) => {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  return (
    <div className="flex items-center justify-between px-4 h-12 gap-0.5">
      <PreferencesModal
        open={preferencesOpen}
        onOpenChange={setPreferencesOpen}
        initialValue={workspace.name}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="transparent"
            size="sm"
            className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
          >
            <span className="truncate w-full mr-1">{workspace.name}</span>
            <ChevronDown className="size-4 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64"
          align="start"
        >
          <DropdownMenuItem className="cursor-pointer capitalize">
            <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex-center mr-2">
              {getInitialLetter(workspace.name)}
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold">{workspace.name}</p>
              <p className="text-xs text-muted-foreground">Active workspace</p>
            </div>
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer py-2">
                Invite people to {workspace.name}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => setPreferencesOpen(true)}
              >
                Preferences
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-0.5">
        <Hint
          label="Filter conversations"
          side="bottom"
        >
          <Button
            variant="transparent"
            size="iconSm"
          >
            <ListFilter className="size-4" />
          </Button>
        </Hint>
        <Hint
          label="New message"
          side="bottom"
        >
          <Button
            variant="transparent"
            size="iconSm"
          >
            <SquarePen className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
