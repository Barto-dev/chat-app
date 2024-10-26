import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetWorkspaceById } from '@/features/workspaces/api/useGetWorkspaceById';
import { useGetWorkspaces } from '@/features/workspaces/api/useGetWorkspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/useCreateModal';

export const WorkspaceSwitch = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [, setOpen] = useCreateWorkspaceModal();
  const { data: currentWorkspace, isLoading: currentWorkspaceLoading } =
    useGetWorkspaceById({ id: workspaceId });
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== workspaceId,
  );

  if (workspacesLoading || currentWorkspaceLoading) {
    return <Skeleton className="size-9" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAB] hover:bg-[#ABABAB]/80 text-slate-800 font-semibold text-xl">
          {currentWorkspace?.name.charAt(0).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64"
      >
        <DropdownMenuItem
          onClick={() => router.push(`/workspaces/${workspaceId}`)}
          className="cursor-pointer flex-col justify-start items-start capitalize"
        >
          <span className="truncate w-full">{currentWorkspace?.name}</span>
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            onClick={() => router.push(`/workspace/${workspace._id}`)}
            className="cursor-pointer capitalize"
          >
            <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex-center mr-2">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-xl rounded-md flex-center mr-2">
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
