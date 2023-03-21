import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";
import serverAuth from "../../../lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //checks the request method. If it is not a GET method, it returns a 405 status code.
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }
    //calls the serverAuth function to verify that the request is authorized
    await serverAuth(req);

    // extracts the movieId parameter from the request's query string.
    const { movieId } = req.query;

    // checks if it's a string and is not empty. If it's invalid, an error is thrown.
    if (typeof movieId !== "string") {
      throw new Error("Invalid Id");
    }

    if (!movieId) {
      throw new Error("Missing Id");
    }
    //uses the prismadb module to retrieve a movie record with the given ID from the database. This function returns a Promise that resolves to a movie object or null if the record is not found.
    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    // if a movie object is found, the function returns a 200 status code and sends the movie object as a JSON response
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
