import { Check, Copy, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNewJoinCode } from '@/features/workspaces/api/useNewJoinCode';
import { useConfirm } from '@/hooks/useConfirm';
import { useCopy } from '@/hooks/useCopy';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

import { Doc } from '../../../../../convex/_generated/dataModel';

interface InviteToChannelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspace: Doc<'workspaces'>;
}

export const InviteToChannelModal = ({
  workspace,
  open,
  onOpenChange,
}: InviteToChannelModalProps) => {
  const workspaceId = useWorkspaceId();
  const [isCopied, handleCopy] = useCopy({ resetInterval: 3 });
  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Are you sure?',
    message:
      'This will invalidate the current join code and generate a new one.',
  });

  const { mutate, isPending } = useNewJoinCode();

  const copy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    handleCopy(inviteLink);
  };

  const onGenerateNewCode = async () => {
    const ok = await confirm();
    if (ok) {
      mutate({ workspaceId });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {workspace.name}</DialogTitle>
            <DialogDescription>
              Use the code below to invite people to this workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-col flex-center gap-y-4 py-10">
            <p className="text-4xl font-bold tracking-widest uppercase">
              {workspace.joinCode}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={copy}
            >
              Copy invite link
              {isCopied ? <Check /> : <Copy />}
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button
              onClick={onGenerateNewCode}
              disabled={isPending}
            >
              Generate new code
              <RefreshCcw className="size-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmDialog />
    </>
  );
};
