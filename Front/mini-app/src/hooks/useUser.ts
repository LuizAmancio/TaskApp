"use client";
import Cookie from 'js-cookie';
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${Cookie.get("token")}` },
  }).then(res => res.json());

export function useUser() {
  const { data: user, error, isLoading } = useSWR("/api/me", fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60 * 60 * 1000, // 1h de cache
});

  return {
    user,
    loading: isLoading,
    error,
    isAuthenticated: !!user ,
  };
}
