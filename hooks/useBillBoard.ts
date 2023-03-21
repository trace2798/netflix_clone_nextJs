// exports a custom hook called useBillboard. This hook uses the useSwr hook from the swr library to fetch data from the /api/random endpoint.
import useSwr from "swr";
//fetcher function, which is a helper function that is used to fetch data from the specified URL. This function is imported from the fetcher module.
import fetcher from "../lib/fetcher";

const useBillboard = () => {
  //The useSwr hook takes three arguments. The third argument is an options object that is used to configure the behavior of the useSwr hook. In our case all the 3 options are set to false.
  const { data, error, isLoading } = useSwr("/api/random", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  //The useBillboard hook returns an object with three properties: data, error, and isLoading.
  //The data property holds the data fetched from the /api/random endpoint. If the data hasn't been fetched yet, data will be undefined.
  //The error property holds any errors that occurred while fetching the data, and if no errors occurred, error will be undefined. The isLoading property is a boolean that indicates whether data is currently being fetched or not. isLoading will be true while data is being fetched, and false otherwise
  return {
    data,
    error,
    isLoading,
  };
};

export default useBillboard;