import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-gray-800">
      <div className="relative flex h-[130px] items-center justify-between px-6">
        <div className="flex items-center">
          <button onClick={() => router.push("/walkthrough")}>
            <p className="text-4xl font-bold text-indigo-300 tracking-wide hover:text-indigo-400 transition duration-300 ease-in-out">
              Ethereum LST
            </p>
          </button>
        </div>

        <div className="flex space-x-4 ml-auto">
          <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 text-xl" onClick={() => router.push('/lstpage')}>
            Walkthrough
          </button>
          <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 text-xl" onClick={() => router.push('/')}>
            Transfer Token
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;