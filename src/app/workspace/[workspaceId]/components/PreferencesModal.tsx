import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { UpdateNameModal } from '@/app/workspace/[workspaceId]/components/UpdateNameModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRemoveWorkspace } from '@/features/workspaces/api/useRemoveWorkspace';
import { useConfirm } from '@/hooks/useConfirm';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

interface PreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue: string;
}

export const PreferencesModal = ({
  open,
  onOpenChange,
  initialValue,
}: PreferencesModalProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Are you sure you want to delete this workspace?',
    message: 'This action cannot be undone.',
  });
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  const onRemoveWorkspace = async () => {
    const ok = await confirm();

    if (!ok) return;

    await removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success('Workspace removed');
          onOpenChange(false);
          router.replace('/');
        },
        onError: () => toast.error('Failed to remove workspace'),
      },
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{initialValue}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <UpdateNameModal
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              initialValue={initialValue}
            />
            <button
              disabled={isRemovingWorkspace}
              onClick={onRemoveWorkspace}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-4" />
              <span className="text-sm font-semibold ">Delete workspace</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
