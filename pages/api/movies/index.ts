import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";
import serverAuth from "../../../lib/serverAuth";

/**
This is an API handler function that returns a list of movies.
It is exported as the default function to be used by an API route.
@param {NextApiRequest} req - The HTTP request object.
@param {NextApiResponse} res - The HTTP response object.
@returns {Promise<void>} - A Promise that resolves once the response has been sent.
*/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }
    // Authenticate the user making the request with the server.
    await serverAuth(req);
    // Fetch a list of movies from the database.
    const movies = await prismadb.movie.findMany();
    // Return the list of movies in the response.
    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
