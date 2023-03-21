// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//This is the seed.ts file
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//The type declaration defines the shape of the response data that will be returned by this API route. In this case, the response will contain a name property of type string.
type Data = {
  name: string;
};

// The function handler will be executed when this API route is called.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //The following line is optional. When "prisma.user.deleteMany()" function is called, it will delete all existing users from the database. It is really helpful if we have any properties with unique value.

  await prisma.movie.deleteMany();

  //Now the "prisma.user.create()" function is called to create a new user in the database.

  const MovieOne = await prisma.movie.create({
    data: {
      title: "Big Buck Bunny",
      description:
        "Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
      genre: "Comedy",
      duration: "10 minutes",
    },
  });

  const MovieTwo = await prisma.movie.create({
    data: {
      title: "Sintel",
      description:
        "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnailUrl: "http://uhdtv.io/wp-content/uploads/2020/10/Sintel-3.jpg",
      genre: "Adventure",
      duration: "15 minutes",
    },
  });

  const MovieThree = await prisma.movie.create({
    data: {
      title: "Tears of Steel",
      description:
        "In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to try to stop an army of robots that threatens the planet.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      thumbnailUrl:
        "https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg",
      genre: "Action",
      duration: "12 minutes",
    },
  });

  const MovieFour = await prisma.movie.create({
    data: {
      title: "Elephant's Dream",
      description:
        "Friends Proog and Emo journey inside the folds of a seemingly infinite Machine, exploring the dark and twisted complex of wires, gears, and cogs, until a moment of conflict negates all their assumptions.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl: "https://download.blender.org/ED/cover.jpg",
      genre: "Sci-Fi",
      duration: "15 minutes",
    },
  });

  res.status(200).json({ name: "From Seed.ts seeding was successful." });
}
