import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { useCreateChannel } from '@/features/channels/api/useCreateChannel';
import { useCreateChannelModal } from '@/features/channels/store/useCreateChannelModal';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

const formSchema = z.object({
  name: z.string().min(3).max(80),
});

type CreateChannelForm = z.infer<typeof formSchema>;

export const CreateChannelModal = () => {
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();
  const { mutate, isPending } = useCreateChannel();

  const form = useForm<CreateChannelForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleClose = (value: boolean) => {
    form.reset();
    setOpen(value);
  };

  const onSubmit = async (data: CreateChannelForm) => {
    await mutate(
      {
        workspaceId,
        name: data.name,
      },
      {
        onSuccess: () => handleClose(false),
        onError: () => toast.error('Failed to create channel'),
      },
    );
    handleClose(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new channel</DialogTitle>
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
                      placeholder="e.g. plan-budget"
                      {...field}
                      onChange={(evt) => {
                        // replace all spaces with dashes and allow only one dash
                        const value = evt.target.value
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-')
                          .toLowerCase();
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isPending}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
