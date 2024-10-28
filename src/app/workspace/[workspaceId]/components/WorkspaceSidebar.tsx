import {
  Hash,
  Loader,
  MessageSquareText,
  SendHorizonal,
  TriangleAlert,
} from 'lucide-react';

import { UserItem } from '@/app/workspace/[workspaceId]/components/UserItem';
import { useGetChannels } from '@/features/channels/api/useGetChannels';
import { useCurrentMember } from '@/features/membets/api/useCurrentMember';
import { useGetMembers } from '@/features/membets/api/useGetMembers';
import { useGetWorkspaceById } from '@/features/workspaces/api/useGetWorkspaceById';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

import { SidebarItem } from './SidebarItem';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceSection } from './WorkspaceSection';

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: memberData, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });

  const { data: workspaceData, isLoading: workspaceLoading } =
    useGetWorkspaceById({ id: workspaceId });

  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  if (memberLoading || workspaceLoading || channelsLoading || membersLoading) {
    return (
      <div className="flex-center flex-col h-full">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!memberData || !workspaceData) {
    return (
      <div className="flex-center gap-y-2 flex-col h-full text-white">
        <TriangleAlert className="size-5" />
        <p className="text-sm">Workspace not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <WorkspaceHeader
        workspace={workspaceData}
        isAdmin={memberData.role === 'admin'}
      />
      <div className="flex flex-col bg-[#5E2C5F] h-full">
        <div className="flex flex-col px-2 mt-3">
          <SidebarItem
            label="Threads"
            icon={MessageSquareText}
            id="threads"
          />
          <SidebarItem
            label="Drafts & Sent"
            icon={SendHorizonal}
            id="drafts"
          />
        </div>
        <WorkspaceSection
          label="Channels"
          hint="New channel"
          onNew={() => {}}
        >
          {channels?.map(({ _id, name }) => (
            <SidebarItem
              key={_id}
              label={name}
              icon={Hash}
              id={_id}
            />
          ))}
        </WorkspaceSection>

        <WorkspaceSection
          label="Direct Messages"
          hint="New direct message"
          onNew={() => {}}
        >
          {members?.map(({ _id, user }) => (
            <UserItem
              key={_id}
              id={_id}
              label={user.name}
              image={user.image}
            />
          ))}
        </WorkspaceSection>

      </div>
    </div>
  );
};
