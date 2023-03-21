import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../lib/serverAuth";

/**
A Next.js API route handler function that handles GET requests to fetch the current user.
@param {NextApiRequest} req The Next.js API request object.
@param {NextApiResponse} res The Next.js API response object.
@returns {Promise<void>} A Promise that resolves when the request is complete.
**/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check if the request method is not GET, and return a 405 status code if it is not.
    if (req.method !== "GET") {
      return res.status(405).end();
    }
    //fetching the current user using the serverAuth helper function
    const { currentUser } = await serverAuth(req);
    // Return a 200 status code with the current user as JSON in the response body.
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
