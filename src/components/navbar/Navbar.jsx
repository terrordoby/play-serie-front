import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import logo from "../../../public/images/logo.svg";

const Navbar = () => {
  const userSession = useSession();
  const username = userSession?.data?.user.name;
  return (
    <nav className="bg-black px-5 py-1 flex items-center">
      <Link href="/home">
        <Image width={123} height={123} src={logo} />
      </Link>
      <div className="flex justify-between flex-1">
        <div className="flex gap-12 ml-12">
          <Link className="text-white text-xl relative group" href="/home">
              Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all hidden group-hover:block"></span>
          </Link>
          <Link className="text-white text-xl relative group" href="/favorites-series">
              Lista de Favoritos
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all hidden group-hover:block"></span>
          </Link>
          <Link className=" text-white text-xl" href={"/"}>Desejo Assistir</Link>
        </div>
        <div className="flex items-center gap-2 pr-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <strong className=" text-white">Ola, {username}</strong>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
