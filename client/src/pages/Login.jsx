import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          ...input,
        },
        {
          withCredentials: true,
        }
      );
      const { success, message } = data;
      if (success) {
        setSuccess(message);
      } else {
        setError(message);
      }
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }
    setInput({
      email: "",
      password: "",
    });
  };
  return (
    <div className=" w-screen items-center justify-center h-screen flex">
      <div className="w-full flex-col max-w-lg bg-base-300 flex items-center justify-center rounded-xl p-14">
        <h1 className="text-4xl">Login</h1>
        <form
          action="submit"
          className="flex mt-5 flex-col"
          onSubmit={handleSubmit}
        >
          <label className="label label-text" htmlFor="Email">
            Email
          </label>
          <input
            type="text"
            className=" input input-primary "
            name="email"
            onChange={handleChange}
          />
          <label className="label label-text" htmlFor="Password">
            Password
          </label>
          <input
            type="password"
            className="input input-primary"
            name="password"
            onChange={handleChange}
          />
          <div className=" items-center justify-center flex mt-10">
            <button
              className="btn btn-primary normal-case rounded-xl"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        {success && (
          <div className="alert alert-success mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="alert alert-error mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
