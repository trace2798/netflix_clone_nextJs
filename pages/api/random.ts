//module that exports a function called handler. This function serves as a Next.js API route handler function that handles GET requests for a random movie.
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";
import serverAuth from "../../lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //checks if the request method is not GET, and returns a 405 status code if it is not.
    if (req.method !== "GET") {
      return res.status(405).end();
    }
    //calls the serverAuth helper function to authenticate the user making the request.
    await serverAuth(req);
    //queries the database using the prismadb library to get the total number of movies 
    const moviesCount = await prismadb.movie.count();
    //generates a random index within the range of the total number of movies. 
    const randomIndex = Math.floor(Math.random() * moviesCount);
    //The function then uses the prismadb library to fetch a random movie from the database by specifying the take and skip options in the findMany method.
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    //returns a 200 status code with the randomly selected movie as JSON in the response body
    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    //If an error occurs during the execution of the function, the error is logged and a 500 status code is returned.
    return res.status(500).end();
  }
}
