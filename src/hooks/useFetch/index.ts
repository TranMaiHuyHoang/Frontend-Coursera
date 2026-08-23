import { useCallback, useRef, useState } from 'react';

type UseFetchProps<T> = {
    fetchFn: () => Promise<T>;
};

export default function useFetch<T>({ fetchFn }: UseFetchProps<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const fetchFnRef = useRef(fetchFn);
    fetchFnRef.current = fetchFn;

    // Lưu request đang chạy
    const requestRef = useRef<Promise<T> | null>(null);

    const loadFetchFn = useCallback(async () => {
        // Nếu đang có request thì dùng lại request đó
        if (requestRef.current) {
            return requestRef.current;
        }

        setIsLoading(true);
        setError(null);

        const request = fetchFnRef.current();

        requestRef.current = request;

        try {
            const response = await request;

            setData(response);

            return response;
        } catch (err) {
            setError(err);
            setData(null);

            throw err;
        } finally {
            requestRef.current = null;
            setIsLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setIsLoading(false);
    }, []);

    return {
        data,
        isLoading,
        error,
        loadFetchFn,
        reset,
    };
}
