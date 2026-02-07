import Api from "../../../services/api/CallApi";
import { useState, useEffect } from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";

export const useFetch = (
  apiDetails: any,
  initialData: any,
  timeout: number = 0
) => {
  const [data, setData] = useState(initialData);

  const queryResult = useQuery({
    queryKey: [apiDetails.key, apiDetails] as QueryKey,

    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            Api<any>(
              apiDetails.url,
              apiDetails.body || null,
              apiDetails.headers,
              apiDetails.method
            )
          );
        }, timeout);
      }),

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // ⬅️ cacheTime → gcTime
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!queryResult.isFetching && !queryResult.isError) {
      setData(queryResult.data);
    }
  }, [queryResult.isFetching, queryResult.isError, queryResult.data]);

  return {
    ...queryResult,
    data,
    isLoading: queryResult.isPending, // ✅ alias برای سازگاری
  };
};
