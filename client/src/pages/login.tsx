import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const LoginPage = () => {
  const [error, setError] = useState<String>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      dispatch(setUser(res.data));
      navigate("/");
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-full">
      <div className="flex h-full w-3/5 items-center justify-center">
        <form className="flex w-3/5 flex-col gap-5" onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            minLength={3}
            maxLength={20}
            className="rounded-md border p-5 text-slate-900"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="rounded-md border p-5 text-slate-900"
          />
          <button
            disabled={isLoading}
            className="cursor-pointer rounded-md border-0 bg-cyan-500 p-5 text-white transition-all duration-300 hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-[#BED9D8]"
          >
            Login
          </button>
          {error && <span className="text-red-500">{error}</span>}
          <Link
            to="/register"
            className="w-max border-b border-b-gray-500 text-sm text-gray-500"
          >
            {"Don't"} you have an account?
          </Link>
        </form>
      </div>
      {/* RIGHT SECTION */}
      <div className="m-auto flex h-1/2 w-2/5 items-center justify-center">
        <img
          src="login.jpg"
          alt=""
          className="h-full rounded-md border border-cyan-400 object-cover transition-all duration-300 hover:shadow-[10px_10px_0px_rgba(34,211,238)]"
        />
      </div>
    </div>
  );
};

export default LoginPage;
