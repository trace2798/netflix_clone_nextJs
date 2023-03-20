import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from "../lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  //fetching logged in users session
  const session = await getSession({ req });
  //check if session exist.
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  // if session exist.
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
