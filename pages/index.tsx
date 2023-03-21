import Head from "next/head";
import Image from "next/image";
import Input from "../components/Input";
import { signOut } from "next-auth/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";
import Navbar from "../components/Navbar";
import BillBoard from "../components/BillBoard";
import MovieList from "../components/MovieList";
import useMovieList from "../hooks/useMovieList";
import useFavorites from "../hooks/useFavorites";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
