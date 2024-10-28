import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateWorkspace } from '@/features/workspaces/api/useUpdateWorkspace';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

interface UpdateNameModalProps {
  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  initialValue: string;
}

const updateNameSchema = z.object({
  name: z.string(),
});

type UpdateNameFields = z.infer<typeof updateNameSchema>;

export const UpdateNameModal = ({
  editOpen,
  setEditOpen,
  initialValue,
}: UpdateNameModalProps) => {
  const workspaceId = useWorkspaceId();

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();

  const form = useForm<UpdateNameFields>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name: initialValue },
  });

  const onChangeNameSubmit = async (fields: UpdateNameFields) => {
    await updateWorkspace(
      {
        id: workspaceId,
        name: fields.name,
      },
      {
        onError: () => toast.error('Failed to update workspace name'),
      },
    );
    setEditOpen(false);
  };

  return (
    <Dialog
      open={editOpen}
      onOpenChange={setEditOpen}
    >
      <DialogTrigger>
        <div className="px-5 flex flex-col py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Workspace name</p>
            <p className="text-sm text-[#1264a3] hover:underline font-semibold">
              Edit
            </p>
          </div>
          <p className="text-sm self-start">{initialValue}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit workspace name</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-y-4"
            onSubmit={form.handleSubmit(onChangeNameSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isUpdatingWorkspace}
                      placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={isUpdatingWorkspace}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isUpdatingWorkspace}
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
