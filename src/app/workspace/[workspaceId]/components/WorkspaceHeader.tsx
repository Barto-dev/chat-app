import { ChevronDown, ListFilter, SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getWorkspaceInitial } from '@/lib/getWorkspaceInitial';

import { Doc } from '../../../../../convex/_generated/dataModel';
import { Hint } from '@/components/Hint';

interface WorkspaceHeaderProps {
  workspace: Doc<'workspaces'>;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({
  isAdmin,
  workspace,
}: WorkspaceHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 h-12 gap-0.5">
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
              {getWorkspaceInitial(workspace.name)}
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
              <DropdownMenuItem className="cursor-pointer py-2">
                Preferences
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-0.5">
        <Hint label="Filter conversations" side="bottom">
          <Button
            variant="transparent"
            size="iconSm"
          >
            <ListFilter className="size-4" />
          </Button>
        </Hint>
        <Hint label="New message" side="bottom">
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
