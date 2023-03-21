import useSwr from "swr";
import fetcher from "../lib/fetcher";

// takes an optional id parameter, which is used to fetch a single movie if provided. If no id is provided, the hook returns data for all movies.
const useMovie = (id?: string) => {
  //useSwr hook is then used to fetch the movie data using the API endpoint /api/movies/${id}, where id is the optional parameter passed to the hook
  const { data, error, isLoading } = useSwr(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  //returns an object with the data, error, and isLoading properties.
  //This object can be used in a component to display movie data, handle errors, and show a loading indicator while the data is being fetched.
  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;
