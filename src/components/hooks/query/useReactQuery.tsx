import { useEffect } from "react";
import Api from "../../../services/api/CallApi";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { useQuery, useMutation, QueryKey } from "@tanstack/react-query";

import useStore from "../../../store/zustand/store";
import { GetUserToken } from "../../../services/api/ApiToken";

/* =========================
   Auth Header
========================= */
export const AuthApiHeader = new Headers();
AuthApiHeader.append("Content-Type", "application/json");

const token = GetUserToken();
if (token) {
  AuthApiHeader.append("Authorization", `Bearer ${token}`);
}

/* =========================
   useReactQuery (QUERY)
========================= */
export const useReactQuery = (apiDetails: any) => {
  const {
    data,
    isPending, // ✅ v5
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["nodeData", apiDetails] as QueryKey,
    queryFn: () =>
      Api<any>(
        apiDetails.url,
        apiDetails.body || {},
        AuthApiHeader,
        apiDetails.method
      ),

    staleTime: 0,
    gcTime: 1 * 60 * 1000, // ⬅️ cacheTime → gcTime
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  return {
    data,
    isLoading: isPending, // 🔥 alias برای اینکه پروژه نشکنه
    isError,
    error,
    refetch,
  };
};

/* =========================
   useReactMutation (MUTATION)
========================= */
export const useReactMutation = (
  apiDetails: any,
  onSuccess?: Function,
  onError?: Function
) => {
  return useMutation({
    mutationFn: (data: any) =>
      Api(apiDetails.url, data, AuthApiHeader, apiDetails.method),

    onSuccess: (response) => {
      if (onSuccess) onSuccess(response);
    },

    onError: (error) => {
      if (onError) onError(error);
    },
  });
};
