import useSWR from "swr";

import fetcher from "../lib/fetcher";

// swr is a vercel developed package which is use to fetch data. with swr we do not need redux or any other state management.

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "api/current",
    fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
