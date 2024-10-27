import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";

function RegisterPage() {
  const [error, setError] = useState<String>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex h-full w-3/5 items-center justify-center">
        <form className="flex flex-col w-3/5 gap-5" onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            minLength={3}
            maxLength={20}
            className="rounded-md border p-5 text-slate-900"
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
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
            Register
          </button>
          {error && <span className="text-red-500">{error}</span>}
          <Link
            to="/login"
            className="w-max border-b border-b-gray-500 text-sm text-gray-500"
          >
            Do you have an account?
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
}

export default RegisterPage;
