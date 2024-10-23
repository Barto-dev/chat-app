'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateWorkspace } from '@/features/workspaces/api/useCreateWorkspace';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/useCreateModal';

const formSchema = z.object({
  name: z.string().min(3),
});

type CreateWorkspaceForm = z.infer<typeof formSchema>;

export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateWorkspace();
  const [open, setOpen] = useCreateWorkspaceModal();

  const form = useForm<CreateWorkspaceForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const onSubmit = async (data: CreateWorkspaceForm) => {
    const workspaceId = await mutate(data);
    if (workspaceId) {
      handleClose();
      toast.success('Workspace created');
      router.push(`/workspace/${workspaceId}`);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoFocus
                      disabled={isPending}
                      placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
