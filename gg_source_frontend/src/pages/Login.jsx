import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Mobile:", mobile);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/logo 1.png"
            alt="Logo"
            className="h-30 w-auto"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Your Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            >
              {showPassword ? <BiShow size={20} /> : <BiHide size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
