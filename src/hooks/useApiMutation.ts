import { useCallback, useMemo, useState } from 'react';

type Options<ResponseType> = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
  throwErrors?: boolean;
};

export const useApiMutation = <RequestType, ResponseType>(
  mutationFn: (values: RequestType) => Promise<ResponseType>,
) => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  const [status, setStatus] = useState<
    'success' | 'error' | 'settled' | 'pending' | null
  >(null);

  const isPending = useMemo(() => status === 'pending', [status]);
  const isSuccess = useMemo(() => status === 'success', [status]);
  const isError = useMemo(() => status === 'error', [status]);
  const isSettled = useMemo(() => status === 'settled', [status]);

  const mutate = useCallback(
    async (values: RequestType, options?: Options<ResponseType>) => {
      try {
        setData(null);
        setError(null);
        setStatus('pending');

        const response = await mutationFn(values);
        options?.onSuccess?.(response);
        setData(response);
        setStatus('success');
        return response;
      } catch (error) {
        options?.onError?.(error);
        setError(error);
        setStatus('error');
        if (options?.throwErrors) {
          throw error;
        }
      } finally {
        setStatus('settled');
        options?.onSettled?.();
      }
    },
    [mutationFn],
  );

  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    isSettled,
  };
};
