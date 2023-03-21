import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import useFavorites from "../hooks/useFavorites";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  // uses the useFavorites and useCurrentUser hooks to get the current user's favorite movies and the current user's information, respectively
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  // `useMemo` is used to memoize the `isFavorite` value to avoid unnecessary re-renders
  const isFavorite = useMemo(() => {
    // Get the list of favoriteIds from the currentUser object or return an empty array if currentUser is undefined
    const list = currentUser?.favoriteIds || [];
    // Check if the movieId is present in the list of favoriteIds
    return list.includes(movieId);
    // Dependencies: `currentUser` and `movieId`
  }, [currentUser, movieId]);

  // `useCallback` is used to memoize the `toggleFavorites` function to avoid unnecessary re-renders
  const toggleFavorites = useCallback(async () => {
    let response;
    // If the movie is already marked as a favorite, then remove it from the list
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      // If the movie is not marked as a favorite, then add it to the list
      response = await axios.post("/api/favorite", { movieId });
    }

    // Get the updated list of favoriteIds from the response
    const updatedFavoriteIds = response?.data?.favoriteIds;
    // Update the `favoriteIds` field of the currentUser object with the updated list of favoriteIds
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    // Call `mutateFavorites` function to update the list of favorite movies
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  //value of Icon is determined by using a ternary operator. If isFavorite is true, Icon is set to AiOutlineCheck else AiOutlinePlus.
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
