import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    username: "",
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
        "http://localhost:3000/api/user/signup",
        {
          ...input,
        },
        {
          withCredentials: true,
        }
      );
      const { success, message } = data;
      if (success) {
        console.log(message);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen items-center justify-center h-screen flex">
      <div className="w-full flex-col max-w-lg bg-base-300 flex items-center justify-center rounded-xl p-14">
        <h1 className="text-4xl">Signup</h1>
        <form
          className="flex mt-5 flex-col"
          action="submit"
          onSubmit={handleSubmit}
        >
          <label className="label label-text" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className=" input input-primary "
            name="username"
            onChange={handleChange}
          />
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
      </div>
    </div>
  );
};

export default Signup;
