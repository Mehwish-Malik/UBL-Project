import { useState, useEffect, useCallback } from 'react';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: () => Promise<void>;
  setData: (data: T | null) => void;
  reset: () => void;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  emptyCheck?: (data: T | null) => boolean
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
    isEmpty: false,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await asyncFunction();
      const isEmpty = emptyCheck ? emptyCheck(data) : false;

      setState({
        data,
        loading: false,
        error: null,
        isEmpty,
      });
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err instanceof Error ? err.message : 'An error occurred',
        isEmpty: false,
      });
    }
  }, [asyncFunction, emptyCheck]);

  const setData = useCallback((data: T | null) => {
    const isEmpty = emptyCheck ? emptyCheck(data) : false;
    setState({
      data,
      loading: false,
      error: null,
      isEmpty,
    });
  }, [emptyCheck]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      isEmpty: false,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []); // Only run on mount if immediate

  return {
    ...state,
    execute,
    setData,
    reset,
  };
}
