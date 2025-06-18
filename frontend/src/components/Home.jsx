import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      {/* Logo / Title */}
      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        Welcome to PaySecure
      </h1>

      {/* Card */}
      <div className="bg-white text-black rounded-2xl shadow-lg w-full max-w-sm p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Get Started</h2>

        <div className="flex flex-col gap-4">
          <button className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition duration-200">
            <Link to={"/signin"}> Sign In</Link>
          </button>
          <button className="w-full border border-black text-black py-2.5 rounded-lg hover:bg-gray-100 transition duration-200">
            <Link to={"/signup"}>Sign Up</Link>
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-400">
        © 2025 PaySecure. All rights reserved.
      </p>
    </div>
  );
};

export default Home;
