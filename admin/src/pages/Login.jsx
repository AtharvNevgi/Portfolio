import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const  {login}  = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", { username, password });
      login(res.data.token);
      console.log(username, password)
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}