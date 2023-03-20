import Link from "next/link";
import React from "react";

const Navbar = () => {
  // const session = await getServerSession()
  const items = [];

  return (
    <div className="w-full bg-slate-300">
      <div className="p-5 md:mx-[10vw] flex justify-between">
        <div>
          <h1>Navbar</h1>
        </div>
        <div className="flex">
          <h1 className="mr-10">Register</h1>
          <h1 className="mr-10">Log In</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
