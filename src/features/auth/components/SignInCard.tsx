'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

export const SignInCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuthActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await signIn('password', { ...values, flow: 'signIn' });
    } catch {
      form.setError('root', {
        type: 'manual',
        message: 'Invalid email or password',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="p-0 mb-6">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {form.formState.errors.root && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{form.formState.errors.root.message}</p>
        </div>
      )}
      <CardContent className="p-0 space-y-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2.5 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      autoComplete="current-password"
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              type="submit"
            >
              Continue
            </Button>
          </form>
        </Form>
        <Separator />
        <section className="flex flex-col gap-y-2.5">
          <Button
            className="relative"
            onClick={() => console.log('Google')}
            variant="outline"
            size="lg"
          >
            <FcGoogle className="size-5 absolute left-3" />
            <span>Continue with Google</span>
          </Button>
          <Button
            className="relative"
            onClick={() => signIn('github')}
            variant="outline"
            size="lg"
          >
            <FaGithub className="size-5 absolute left-3" />
            <span>Continue with GitHub</span>
          </Button>
        </section>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
