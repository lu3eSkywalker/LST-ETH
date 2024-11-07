import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 z-10">
      <div className="relative flex h-[130px] items-center justify-between px-6">
        <div className="flex items-center">
          <button onClick={() => router.push("/lstpage")}>
            <p className="text-4xl font-bold text-indigo-300 tracking-wide hover:text-indigo-400 transition duration-300 ease-in-out">
              Ethereum LST
            </p>
          </button>
        </div>

        <div className="flex space-x-4 ml-auto">
          <a
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 text-xl"
            href="https://twitter.com/Sooraj8304985"
          >
            Twitter
          </a>
          <a
            className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 text-xl"
            href="https://github.com/lu3eskywalker"
          >
            Github
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
