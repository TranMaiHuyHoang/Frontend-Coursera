import { useCallback, useState } from 'react';

type UseFetchProps<T> = {
    fetchFn: () => Promise<T>;
};

export default function useFetch<T>({ fetchFn }: UseFetchProps<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const loadFetchFn = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetchFn();

            setData(response);

            return response;
        } catch (err) {
            setError(err);
            setData(null);

            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [fetchFn]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setIsLoading(false);
    }, []);

    return {
        data,
        setData,
        isLoading,
        error,
        loadFetchFn,
        reset,
    };
}
