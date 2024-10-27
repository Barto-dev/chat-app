import { Bell, Home, MessageSquare, MoreHorizontal } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { SidebarButton } from '@/app/workspace/[workspaceId]/components/SidebarButton';
import { UserButton } from '@/features/auth/components/UserButton';

import { WorkspaceSwitch } from './WorkspaceSwitch';

export const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className="w-sidebar h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-2 pb-4 shrink-0">
      <WorkspaceSwitch />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathName.includes('/workspace')}
      />
      <SidebarButton
        icon={MessageSquare}
        label="DMs"
      />
      <SidebarButton
        icon={Bell}
        label="Activity"
      />
      <SidebarButton
        icon={MoreHorizontal}
        label="More"
      />
      <div className="flex-center flex-col gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
